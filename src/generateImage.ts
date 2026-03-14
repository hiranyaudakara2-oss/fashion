import { GoogleGenAI } from "@google/genai";

async function generateImage() {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        {
          text: 'A high-quality 3D render of a black premium cotton t-shirt floating in a clean white studio background. Soft cinematic lighting, 4k resolution, hyper-realistic fabric textures.',
        },
      ],
    },
    config: {
      imageConfig: {
          aspectRatio: "1:1",
          imageSize: "1K"
      }
    },
  });
  
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64EncodeString: string = part.inlineData.data;
      console.log("Image generated:", `data:image/png;base64,${base64EncodeString}`);
    }
  }
}

generateImage().catch(console.error);
