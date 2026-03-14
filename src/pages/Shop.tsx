import { motion } from 'motion/react';
import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Loader2 } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useShop } from '../context/ShopContext';

const elegantColors = [
  "#B76E79", "#D4AF37", "#C0C0C0", "#E5E4E2", "#4A0404",
  "#013220", "#F5F5DC", "#2F4F4F", "#FFD700", "#F0F8FF",
  "#DC143C", "#8B4513", "#708090", "#4682B4", "#D2691E",
  "#556B2F", "#800080", "#A52A2A", "#006400", "#00008B"
];

const fashionItems = [
  "minimalist t-shirt in Natural Titanium",
  "tailored shorts in Rose Gold",
  "relaxed jeans in Washed Indigo",
  "sophisticated dress in Off-white",
  "modern jacket in Deep Charcoal",
  "silk slip dress in muted Emerald Green",
  "structured blazer in Natural Titanium",
  "wide-leg trousers in Deep Charcoal",
  "cashmere sweater in Rose Gold",
  "trench coat in Off-white",
  "pleated skirt in muted Ruby Red",
  "denim jacket in Deep Charcoal",
  "turtleneck top in Natural Titanium",
  "leather bomber jacket in muted Sapphire Blue",
  "tailored shirt in Off-white",
  "evening gown in Deep Charcoal",
  "oversized cardigan in Rose Gold",
  "cargo pants in Natural Titanium",
  "button-down blouse in Off-white",
  "puffer vest in Deep Charcoal"
];

const initialProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: fashionItems[i].split(' in ')[0].replace(/\b\w/g, l => l.toUpperCase()),
  price: `$${(Math.floor(Math.random() * 50) + 20) * 10}`,
  image: `https://picsum.photos/seed/dragho${i + 1}/800/1200`,
  color: elegantColors[i],
  prompt: fashionItems[i]
}));

export default function Shop() {
  const { bgColor, setBgColor } = useShop();
  const [products, setProducts] = useState(initialProducts);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateImages = async () => {
    try {
      setIsGenerating(true);
      setProgress(0);
      
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      for (let i = 0; i < products.length; i++) {
        const prompt = `High-resolution, photorealistic, premium editorial fashion photography of a ${products[i].prompt}. Showcase impeccable texture, fabric details, and rich premium colors. Dramatic yet natural-looking studio lighting. Capture a single, complete garment or a coordinated outfit. NO models, but beautifully draped or styled. Luxurious, highly detailed, contemporary, Apple-inspired minimalist premium fashion sense. Clean, isolated, beautifully composed composition of the clothing item with subtle shadows, making it look like incredibly realistic fabric and construction. Pure solid white background.`;
        
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: prompt,
            config: {
              // @ts-ignore
              imageConfig: {
                aspectRatio: "3:4"
              }
            }
          });
          
          let base64Data = null;
          for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
              base64Data = part.inlineData.data;
              break;
            }
          }
          
          if (base64Data) {
            const imageUrl = `data:image/jpeg;base64,${base64Data}`;
            setProducts(prev => {
              const newProducts = [...prev];
              newProducts[i] = { ...newProducts[i], image: imageUrl };
              return newProducts;
            });
          }
        } catch (err) {
          console.error(`Error generating image ${i}:`, err);
        }
        
        setProgress(((i + 1) / products.length) * 100);
      }
    } catch (error) {
      console.error("Error in generation process:", error);
      alert("Failed to start generation. Please ensure you have selected a valid API key with access to Gemini 3.1 Flash Image Preview.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="flex flex-col items-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl md:text-7xl mb-8 text-center tracking-widest uppercase"
            >
              Shop
            </motion.h1>
            
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={generateImages}
              disabled={isGenerating}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-sans font-medium tracking-widest uppercase overflow-hidden rounded-full border border-current disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 w-full h-full bg-current translate-y-full rounded-t-[50%] group-hover:translate-y-0 group-hover:rounded-none transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] z-0"></span>
              <span className="relative z-10 flex items-center gap-2 group-hover:text-black dark:group-hover:text-white transition-colors duration-500">
                {isGenerating ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating {Math.round(progress)}%
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Generate AI Catalog
                  </>
                )}
              </span>
            </motion.button>
            {isGenerating && (
              <div className="w-64 h-1 bg-current/20 rounded-full mt-4 overflow-hidden">
                <motion.div 
                  className="h-full bg-current"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                onClick={() => setBgColor(product.color)}
                data-color={product.color}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-black/20 shadow-2xl hover:border-white/40 dark:hover:border-black/40 transition-all duration-300"
              >
                <div className="aspect-[3/4] overflow-hidden relative bg-black/10">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6 text-center relative z-10">
                  <h3 className="font-serif text-xl mb-2 tracking-wide">{product.name}</h3>
                  <p className="opacity-60 font-light tracking-widest text-sm">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
