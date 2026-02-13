import { groq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages } from 'ai';
import { createClient } from '@/utils/supabase/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages, chatId: passedChatId, vehicleId: passedVehicleId } = await req.json();
        const supabase = await createClient();

        console.log(`[PERF_START] Chat Processing: chatId=${passedChatId}`);
        const startTime = Date.now();

        // 1. Parallelize User and Initial Metadata Checks
        const [userResult, profileResult] = await Promise.all([
            supabase.auth.getUser(),
            passedChatId ? supabase.from('chats').select('vehicle_id').eq('id', passedChatId).single() : Promise.resolve({ data: null })
        ]);

        const { data: { user } } = userResult;
        if (!user) return new Response('Unauthorized', { status: 401 });

        // 2. Parallelize Profile and Vehicle Detailed Checks
        const vehicleIdToFetch = passedVehicleId || profileResult.data?.vehicle_id;

        const [profileMeta, vehicleMeta] = await Promise.all([
            supabase.from('profiles').select('preferred_language').eq('id', user.id).single(),
            vehicleIdToFetch ? supabase.from('user_vehicles').select('*').eq('id', vehicleIdToFetch).single() : Promise.resolve({ data: null })
        ]);

        const language = profileMeta.data?.preferred_language || 'en';
        const vehicle = vehicleMeta.data;
        let chatId = passedChatId;

        // 3. New Chat Creation (Sequential only if needed)
        if (!chatId) {
            const firstMessage = messages[0]?.content || "New Chat";
            const title = firstMessage.length > 30 ? firstMessage.substring(0, 30) + "..." : firstMessage;

            const { data: newChat, error: chatError } = await supabase
                .from('chats')
                .insert({
                    user_id: user.id,
                    title: title,
                    vehicle_id: vehicleIdToFetch || null
                })
                .select()
                .single();

            if (!chatError) chatId = newChat.id;
        }

        console.log(`[PERF_META] Metadata loaded in ${Date.now() - startTime}ms`);

        // 4. Build Context
        let vehicleDetails = "";
        if (vehicle) {
            if (language === 'sw') {
                vehicleDetails = `
Maelezo ya Gari:
- Kampuni: ${vehicle.make}
- Model: ${vehicle.model}
- Mwaka: ${vehicle.model_year}
- Aina ya Engine: ${vehicle.engine_type || 'Kawaida'}
- Kilomita: ${vehicle.mileage_km}km
`;
            } else {
                vehicleDetails = `
Vehicle Details:
- Make: ${vehicle.make}
- Model: ${vehicle.model}
- Year: ${vehicle.model_year}
- Engine: ${vehicle.engine_type || 'Standard'}
- Mileage: ${vehicle.mileage_km}km
`;
            }
        }

        // 5. System Prompt Construction
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

--- MODE 3: GENERAL (For everything else) ---
Natural, professional, and helpful conversational response as an expert Nairobi mechanic. No forced sections, but stay localized.
`;

        const systemPrompt = language === 'sw'
            ? `Wewe ni fundi wa gari mwenye uzoefu wa zaidi ya miaka 15 mjini Nairobi, Kenya.
Tabia yako:
- **Mtaalamu lakini mcheshi**: Unajua kazi yako lakini unaongea kama fundi wa mtaani.
- **Lugha**: Jibu kwa Kiswahili pekee. Usichanganye na Kiingereza kwingi isipokuwa majina ya kiufundi ya gari.

${STRUCTURE_OPTIONS}
${vehicleDetails}`
            : `You are a highly experienced automotive mechanic based in Nairobi, Kenya, with over 15 years of hands-on experience. 
Your personality is:
- **Professional but direct**: You know your stuff and speak like a local "fundi" (mechanic).
- **Language**: Use PURE British English. Do NOT mix in Swahili or Sheng terms when language is set to 'en'.

${STRUCTURE_OPTIONS}
${vehicleDetails}`;

        // 6. Call Groq with FASTER model
        const result = streamText({
            model: groq('llama-3.1-8b-instant'),
            system: systemPrompt,
            messages: await convertToModelMessages(messages),
            onFinish: async ({ text }) => {
                if (chatId) {
                    await Promise.all([
                        supabase.from('messages').insert({
                            chat_id: chatId,
                            role: 'assistant',
                            content: text
                        }),
                        supabase.from('chats').update({
                            updated_at: new Date().toISOString()
                        }).eq('id', chatId)
                    ]);
                }
                console.log(`[PERF_END] Total round trip: ${Date.now() - startTime}ms`);
            },
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Chat API Error:', error);
        return new Response('Internal error', { status: 500 });
    }
}
