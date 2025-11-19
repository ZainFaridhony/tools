import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
// Ideally, we check if API key exists. 
// For this demo, we assume it is provided by the environment.

const ai = new GoogleGenAI({ apiKey });

export const generateCaption = async (base64Image: string): Promise<string> => {
  try {
    // Extract MIME type and base64 data
    const match = base64Image.match(/^data:(.+);base64,(.+)$/);
    if (!match) throw new Error("Invalid image data");

    const mimeType = match[1];
    const data = match[2];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: {
        parts: [
          { inlineData: { mimeType, data } },
          { text: "Write a short, witty, and engaging caption for this image for social media. Include hashtags." }
        ]
      }
    });

    return response.text || "Could not generate caption.";
  } catch (error) {
    console.error("Caption Error:", error);
    throw error;
  }
};