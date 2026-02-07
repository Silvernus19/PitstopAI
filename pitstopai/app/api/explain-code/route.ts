import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';
import { createClient } from '@/utils/supabase/server';

export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { code, vehicleId } = await req.json();
        const supabase = await createClient();

        // Check Auth
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return new Response('Unauthorized', { status: 401 });

        let vehicleContext = "";
        if (vehicleId) {
            const { data: vehicle } = await supabase
                .from('user_vehicles')
                .select('*')
                .eq('id', vehicleId)
                .single();

            if (vehicle) {
                vehicleContext = `For a ${vehicle.model_year} ${vehicle.make} ${vehicle.model}${vehicle.engine_type ? ` (${vehicle.engine_type})` : ""}.`;
            }
        }

        const systemPrompt = `
You are a highly experienced automotive mechanic based in Nairobi, Kenya. 
Explain OBD-II error codes in simple, practical terms for Kenyan drivers.

Format your response with the following headers:
### 🛠️ Meaning
### 🔍 Common Causes
### ⚠️ Urgency (1-10)
### 💰 Estimated Cost (KES)
### 💡 Pro Tips & Warnings (Scams/Fake Parts)

Use local Nairobi context (e.g., mention Grogan, Industrial Area, or specific common part brands like KYB, NGK). 
Keep the tone helpful, professional, and direct.
`;

        const userPrompt = `Explain error code ${code}. ${vehicleContext}`;

        const result = streamText({
            model: groq('llama-3.3-70b-versatile'),
            system: systemPrompt,
            messages: [{ role: 'user', content: userPrompt }],
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Explain Code API Error:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
