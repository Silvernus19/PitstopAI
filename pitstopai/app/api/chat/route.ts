import { groq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages } from 'ai';
import { createClient } from '@/utils/supabase/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages, chatId: passedChatId, vehicleId: passedVehicleId } = await req.json();
        const supabase = await createClient();

        console.log(`[DEBUG] Chat Request: chatId=${passedChatId}, vehicleId=${passedVehicleId}, messagesCount=${messages?.length}`);

        // 0. Check User
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        let chatId = passedChatId;

        // 1. If no chatId, create a new chat first
        if (!chatId) {
            const firstMessage = messages[0]?.content || "New Chat";
            const title = firstMessage.length > 30 ? firstMessage.substring(0, 30) + "..." : firstMessage;

            const { data: newChat, error: chatError } = await supabase
                .from('chats')
                .insert({
                    user_id: user.id,
                    title: title,
                    vehicle_id: passedVehicleId || null
                })
                .select()
                .single();

            if (chatError) {
                console.error('Error creating new chat:', chatError);
                // Continue anyway but persistence will fail later
            } else {
                chatId = newChat.id;
            }
        }

        // 2. Determine vehicleId
        let vehicleId = passedVehicleId;
        if (!vehicleId && chatId) {
            const { data: chat } = await supabase
                .from('chats')
                .select('vehicle_id')
                .eq('id', chatId)
                .single();
            if (chat) vehicleId = chat.vehicle_id;
        }

        // ... rest of the logic ... (3-4-5)
        // Note: I'll use the updated chatId in the persistence onFinish callback

        // 3. Fetch Vehicle Context if we have a vehicleId
        let vehicleDetails = "";
        if (vehicleId) {
            const { data: vehicle } = await supabase
                .from('user_vehicles')
                .select('*')
                .eq('id', vehicleId)
                .single();

            if (vehicle) {
                vehicleDetails = `
Vehicle Details:
- Make: ${vehicle.make}
- Model: ${vehicle.model}
- Year: ${vehicle.model_year}
- Engine: ${vehicle.engine_type || 'Standard'}
- Mileage: ${vehicle.mileage_km}km
- Notes: ${vehicle.notes || 'None'}
`;
            }
        }

        // 4. Build System Prompt
        const systemPrompt = `
You are a highly experienced automotive mechanic based in Nairobi, Kenya, with over 15 years of hands-on experience fixing everything from old Matatus to modern SUVs. 

Your personality is:
- **Professional but casual**: You know your stuff but you speak like a local "fundi" (mechanic).
- **Honest & Direct**: You don't sugarcoat things. If a part needs replacing, you say so.
- **Localized**: Mix in occasional casual Swahili/Sheng terms naturally (e.g., "maze," "hebu," "shida," "ngori," "sawa").
- **Safety First**: Always remind the user that while you give great advice, they should get a physical inspection for serious issues.

${vehicleDetails}

Provide specific, practical advice based on the vehicle details if provided. If the user hasn't specified vehicle info, ask them politely so you can be more accurate.
`;

        // 5. Call Groq
        const result = streamText({
            model: groq('llama-3.3-70b-versatile'),
            system: systemPrompt,
            messages: await convertToModelMessages(messages),
            onError: ({ error }) => {
                console.error('streamText Error callback:', error);
            },
            onFinish: async ({ text }) => {
                // Save User Message and Assistant Message
                const lastUserMessage = messages[messages.length - 1];

                if (chatId) {
                    try {
                        await supabase.from('messages').insert({
                            chat_id: chatId,
                            role: 'user',
                            content: lastUserMessage.content
                        });

                        await supabase.from('messages').insert({
                            chat_id: chatId,
                            role: 'assistant',
                            content: text
                        });

                        await supabase.from('chats').update({
                            updated_at: new Date().toISOString()
                        }).eq('id', chatId);
                    } catch (dbError) {
                        console.error('Database persistence error:', dbError);
                    }
                }
            },
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
