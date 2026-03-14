import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const items = [
  "minimalist dress in Natural Titanium",
  "tailored shirt in Rose Gold",
  "modern streetwear hoodie in Off-white",
  "sophisticated jacket in Deep Charcoal",
  "silk slip dress in muted Emerald Green",
  "structured blazer in Navy Blue",
  "wide-leg trousers in Camel",
  "cashmere sweater in Soft Gray",
  "trench coat in Muted Olive",
  "pleated skirt in Burgundy",
  "denim jacket in Washed Indigo",
  "turtleneck top in Pure White",
  "leather bomber jacket in Rich Brown",
  "tailored shorts in Sand",
  "evening gown in Midnight Blue",
  "oversized cardigan in Oatmeal",
  "cargo pants in Slate Gray",
  "button-down blouse in Blush Pink",
  "puffer vest in Matte Black",
  "wrap dress in Terracotta"
];

async function generateImage(item, index) {
  console.log(`Generating image ${index + 1}: ${item}`);
  const prompt = `High-resolution, photorealistic, premium editorial fashion photography of a ${item}. Beautifully draped and styled, no models. Sleek, luxurious, highly detailed, contemporary, Apple-inspired minimalist premium fashion sense. Clean, isolated, beautifully composed composition with subtle shadows, incredibly realistic fabric and construction. Studio lighting.`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
    });
    
    let base64Data = null;
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        base64Data = part.inlineData.data;
        break;
      }
    }
    
    if (base64Data) {
      fs.writeFileSync(`./public/products/item-${index + 1}.jpg`, Buffer.from(base64Data, 'base64'));
      console.log(`Saved item-${index + 1}.jpg`);
    } else {
      console.log(`No image data for item-${index + 1}`);
    }
  } catch (e) {
    console.error(`Error generating item-${index + 1}:`, e.message);
  }
}

async function generate() {
  if (!fs.existsSync('./public/products')) {
    fs.mkdirSync('./public/products', { recursive: true });
  }

  // Run in batches of 4 to avoid rate limits
  for (let i = 0; i < items.length; i += 4) {
    const batch = items.slice(i, i + 4);
    await Promise.all(batch.map((item, j) => generateImage(item, i + j)));
  }
}

generate();
