import { motion } from 'motion/react';

const collections = [
  {
    id: 1,
    title: "Crimson Silk",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop",
    span: "col-span-1 md:col-span-2 row-span-2"
  },
  {
    id: 2,
    title: "Noir Velvet",
    image: "https://images.unsplash.com/photo-1509631179647-0c1158a40a4d?q=80&w=1000&auto=format&fit=crop",
    span: "col-span-1 row-span-1"
  },
  {
    id: 3,
    title: "Avant-Garde",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
    span: "col-span-1 row-span-1"
  },
  {
    id: 4,
    title: "Urban Flow",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    span: "col-span-1 md:col-span-2 row-span-1"
  }
];

export default function DraghoCollections() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#050000] relative z-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="font-display text-5xl md:text-7xl text-white mb-4">The Collection</h2>
            <p className="text-white/60 font-sans tracking-wide max-w-md">
              Discover pieces that blend timeless elegance with contemporary edge.
            </p>
          </div>
          <button className="mt-8 md:mt-0 text-sm tracking-[0.2em] uppercase text-white border-b border-white/30 pb-1 hover:border-white transition-colors">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {collections.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-xl ${item.span}`}
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="font-display text-3xl text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.title}</h3>
                <p className="text-white/70 text-sm tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Explore
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
