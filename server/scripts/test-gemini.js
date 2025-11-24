import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

async function runTest() {
  console.log('--- Starting Gemini API Connection Test ---');

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error('❌ ERROR: GOOGLE_API_KEY is not set in your environment variables.');
    console.log('Please make sure you have a .env file in the /server directory with GOOGLE_API_KEY=YOUR_KEY');
    return;
  }
  console.log('✅ GOOGLE_API_KEY found.');

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const modelName = 'gemini-pro';
    
    console.log(`Attempting to connect to model: ${modelName}...`);

    const model = genAI.getGenerativeModel({ model: modelName });

    const prompt = 'Tell me a short, one-sentence joke.';
    
    console.log('Sending prompt to Gemini...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('\n--- ✅ SUCCESS! ---');
    console.log('Gemini API replied:');
    console.log(text);
    console.log('\nThis confirms your API key and environment are configured correctly for basic text generation.');

  } catch (error) {
    console.error('\n--- ❌ FAILURE! ---');
    console.error('An error occurred while trying to connect to the Gemini API:');
    
    // The library often wraps the real error message, so we log the whole object.
    console.error(error);
    
    console.log('\n--- Next Steps ---');
    console.log('1. Double-check that your GOOGLE_API_KEY is correct and has no extra spaces or characters.');
    console.log('2. Ensure the "Generative Language API" or "Vertex AI API" is enabled in your Google Cloud project.');
    console.log('3. Verify your project has a billing account enabled, as some models and features require it.');
  }
}

runTest();