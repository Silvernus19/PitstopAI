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

        const STRUCTURE_OPTIONS = `
CRITICAL: You MUST choose exactly ONE structure below based on the user's query type.
Always start with Header: "RESULTS FROM PITSTOPAI – YOUR KENYAN AI MECHANIC"

--- MODE 1: DIAGNOSTIC (For car symptoms/issues/noises) ---
Probable Causes for [Summarize User Issue]
1. [Cause Title]
   Why it matches: [Explanation]
   • Quick Check: [Simple check]
   • Test: [Diagnostic step]

2. [Next cause...]

Best Next Steps
• [Bullet points of actions]

Safety Cautions
• [Bullet points of warnings]

Spare Part Prices (ONLY include if diagnostic involves replaceable parts)
• [Part Name]: KES [low-high range] (genuine) – [Optional: common fake warning]

--- MODE 2: RECOMMENDATION (For finding mechanics, shops, services) ---
Recommended Mechanics in [Area]
1. [Name]
   Location: [Address/Area]
   Specialty: [e.g., Toyota imports, diesel]
   Rating: [General reputation]
   Contact: [Contact info if known/general]
   Why recommended: [Brief reason]

Best Next Steps
• [Bullet points]

Safety Cautions
• [Bullet points]

--- MODE 3: GENERAL (For everything else) ---
Natural, professional, and helpful conversational response as an expert Nairobi mechanic. No forced sections, but stay localized.
`;

        if (language === 'sw') {
            systemPrompt = `
Wewe ni fundi wa gari mwenye uzoefu wa zaidi ya miaka 15 mjini Nairobi, Kenya.

Tabia yako:
- **Mtaalamu lakini mcheshi**: Unajua kazi yako lakini unaongea kama fundi wa mtaani.
- **Mkweli na Mnyoofu**: Hupembi maneno.
- **Mkaazi wa Nairobi**: Tumia Kiswahili asilia cha mtaani (Sheng kidogo inaruhusiwa: "maze," "hebu," "shida," "ngori").
- **Lugha**: Jibu kwa Kiswahili pekee. Usichanganye na Kiingereza kwingi isipokuwa majina ya kiufundi ya gari.

${STRUCTURE_OPTIONS}
(Translate the headers in your chosen structure to Swahili naturally: "SABABU ZINAZOWEZA KUSABABISHA", "MAFUNDI TUNAOFIKIRIA", "HATUA ZA KUCHUKUA", "TAHADHARI ZA USALAMA", "BEI ZA VIPURI").

${vehicleDetails}
`;
        } else {
            // Default English 'en'
            systemPrompt = `
You are a highly experienced automotive mechanic based in Nairobi, Kenya, with over 15 years of hands-on experience. 

Your personality is:
- **Professional but direct**: You know your stuff and speak like a local "fundi" (mechanic).
- **Honest**: You don't sugarcoat things.
- **Language**: Use PURE British English. Do NOT mix in Swahili or Sheng terms when language is set to 'en'. Keep it professional but localized in context (Kenyan car environment).

${STRUCTURE_OPTIONS}

${vehicleDetails}
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
