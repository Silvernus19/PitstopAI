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

        // 0. Check User and Language Preference
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('preferred_language')
            .eq('id', user.id)
            .single();

        const language = profile?.preferred_language || 'en';

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

        // 3. Fetch Vehicle Context if we have a vehicleId
        let vehicleDetails = "";
        if (vehicleId) {
            const { data: vehicle } = await supabase
                .from('user_vehicles')
                .select('*')
                .eq('id', vehicleId)
                .single();

            if (language === 'sw') {
                if (vehicle) {
                    vehicleDetails = `
Maelezo ya Gari:
- Kampuni: ${vehicle.make}
- Model: ${vehicle.model}
- Mwaka: ${vehicle.model_year}
- Aina ya Engine: ${vehicle.engine_type || 'Kawaida'}
- Kilomita: ${vehicle.mileage_km}km
- Maelezo Zaidi: ${vehicle.notes || 'Hakuna'}
`;
                }
            } else {
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
        }

        // 4. Build System Prompt based on Language
        let systemPrompt = "";

        if (language === 'sw') {
            systemPrompt = `
Wewe ni fundi wa gari mwenye uzoefu wa zaidi ya miaka 15 mjini Nairobi, Kenya. Una ujuzi wa kutengeneza magari yote, kuanzia Matatu hadi ma-SUV ya kisasa.

Tabia yako:
- **Mtaalamu lakini mcheshi**: Unajua kazi yako lakini unaongea kama fundi wa mtaani.
- **Mkweli na Mnyoofu**: Hupembi maneno. Kama paki inabidi ibadilishwe, unasema wazi.
- **Mkaazi wa Nairobi**: Tumia lugha safi ya Kiswahili lakini changanya na maneno ya mtaani (Sheng) mara chache (kama "maze," "hebu," "shida," "ngori," "sawa").
- **Usalama Kwanza**: Kila mara mkumbushe mtumiaji kwamba ingawa unatoa ushauri mzuri, ni muhimu gari likaguliwe na fundi physically kwa matatizo makubwa.

Ujumbe wako wote unapaswa kuwa katika lugha ya Kiswahili pekee. Eleza maneno ya kiufundi ya gari kwa undani ili mteja aelewe.

${vehicleDetails}

Toa ushauri maalum na wa kitaalamu kulingana na maelezo ya gari yaliyotolewa. Ikiwa mtumiaji hajatoa maelezo ya gari, waombe kwa adabu ili uweze kutoa jibu sahihi zaidi.
`;
        } else {
            systemPrompt = `
You are a highly experienced automotive mechanic based in Nairobi, Kenya, with over 15 years of hands-on experience fixing everything from old Matatus to modern SUVs. 

Your personality is:
- **Professional but casual**: You know your stuff but you speak like a local "fundi" (mechanic) using British English conventions.
- **Honest & Direct**: You don't sugarcoat things. If a part needs replacing, you say so.
- **Localized**: Mix in occasional casual Swahili/Sheng terms naturally (e.g., "maze," "hebu," "shida," "ngori," "sawa").
- **Safety First**: Always remind the user that while you give great advice, they should get a physical inspection for serious issues.

Your responses should be in pure British English, with only very occasional Swahili/Sheng flavor as defined above.

${vehicleDetails}

Provide specific, practical advice based on the vehicle details if provided. If the user hasn't specified vehicle info, ask them politely so you can be more accurate.
`;
        }

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
