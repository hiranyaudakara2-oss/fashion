import { GoogleGenAI } from "@google/genai";

async function generateVideo() {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
  
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: 'A high-quality 3D render of a black premium cotton t-shirt floating in a clean white studio background. The shirt is rotating slowly in a full 360-degree horizontal loop. Soft cinematic lighting, 4k resolution, hyper-realistic fabric textures.',
    config: {
      numberOfVideos: 1,
      resolution: '1080p',
      aspectRatio: '16:9'
    }
  });

  console.log("Video generation started, operation:", operation);
  
  // Poll for completion
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({operation: operation});
    console.log("Polling...", operation);
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  console.log("Video generated, link:", downloadLink);
}

generateVideo().catch(console.error);
