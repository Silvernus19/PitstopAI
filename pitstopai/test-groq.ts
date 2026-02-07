import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';
import { config } from 'dotenv';

config({ path: '.env.local' });

async function test() {
    try {
        const { text } = await generateText({
            model: groq('llama-3.3-70b-versatile'),
            prompt: 'Hi, are you there?',
        });
        console.log('Response:', text);
    } catch (e) {
        console.error('Error:', e);
    }
}

test();
