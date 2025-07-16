require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const config = {
    responseMimeType: 'text/plain',
  };

  const model = 'gemini-2.5-pro-preview-03-25';

  try {
    const response = await ai.models.generateContentStream({ model, config, contents });

    let reply = '';
    for await (const chunk of response) {
      reply += chunk.text;
    }

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error getting response from Gemini' });
  }
});

app.listen(5000, () => console.log("Server running at http://localhost:5000"));
