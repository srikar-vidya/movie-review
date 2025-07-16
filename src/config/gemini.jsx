require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const readline = require('readline');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter your prompt: ", async (userInput) => {
  const ai = new GoogleGenAI({
    apiKey: GEMINI_API_KEY,
  });

  const config = {
    responseMimeType: 'text/plain',
  };

  const model = 'gemini-2.5-pro-preview-03-25';

  const contents = [
    {
      role: 'user',
      parts: [{ text: userInput }],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  console.log("\n🤖 Gemini response:\n");

  for await (const chunk of response) {
    process.stdout.write(chunk.text);
  }

  rl.close();
});
