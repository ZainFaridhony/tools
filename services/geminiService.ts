import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; 
// Ideally, we check if API key exists. 
// For this demo, we assume it is provided by the environment.

const ai = new GoogleGenAI({ apiKey });

export const generateImage = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '1:1',
        outputMimeType: 'image/jpeg',
      },
    });

    const base64Image = response.generatedImages?.[0]?.image?.imageBytes;
    if (!base64Image) {
      throw new Error("No image generated");
    }
    return `data:image/jpeg;base64,${base64Image}`;
  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};

export const generateCaption = async (base64Image: string): Promise<string> => {
  try {
    // Extract MIME type and base64 data
    const match = base64Image.match(/^data:(.+);base64,(.+)$/);
    if (!match) throw new Error("Invalid image data");
    
    const mimeType = match[1];
    const data = match[2];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
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

export const createChatSession = () => {
  return ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: "You are a helpful, witty assistant living inside a retro 90s computer interface. Be concise, fun, and use occasional retro tech slang.",
    },
  });
};