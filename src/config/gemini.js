import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAkwYHZuXqZrbgn39CPXK6XtcM7cKdypfM" });

export async function main(actor) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Give me a JSON array of movies where the cast '${actor}' has acted. Each movie object should have the following exact properties: name, rating, year, actors, cast, streamingplatform. 
Return only valid JSON. No explanation, no extra characters, no whitespaces, no markdown formatting.`,
  });

  return response.text;
}
