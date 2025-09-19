// src/components/home/LookbookPreview.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function LookbookPreview() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const looks = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=90",
      title: "Look 01",
      description: "Elegancia Minimalista"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1517298257259-f72ccd2db392?w=600&q=90",
      title: "Look 02", 
      description: "Urban Chic"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&q=90",
      title: "Look 03",
      description: "Sofisticación Natural"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=90",
      title: "Look 04",
      description: "Avant-Garde"
    }
  ];

  return (
    <section ref={containerRef} className="py-32 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-sm tracking-[0.3em] text-gray-500 uppercase mb-4 block">
            Lookbook SS24
          </span>
          <h2 className="text-5xl md:text-6xl font-light mb-6">Descubre el Estilo</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Una exploración visual de nuestra última colección
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div style={{ y: y1 }} className="space-y-8">
            {looks.filter((_, i) => i % 2 === 0).map((look, index) => (
              <motion.a
                key={look.id}
                href="/lookbook"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="block group relative"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-white text-2xl font-light mb-2">{look.title}</h3>
                  <p className="text-white/80 text-sm">{look.description}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div style={{ y: y2 }} className="space-y-8 md:mt-20">
            {looks.filter((_, i) => i % 2 !== 0).map((look, index) => (
              <motion.a
                key={look.id}
                href="/lookbook"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="block group relative"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-white text-2xl font-light mb-2">{look.title}</h3>
                  <p className="text-white/80 text-sm">{look.description}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a 
            href="/lookbook"
            className="inline-flex items-center space-x-3 text-sm tracking-[0.2em] uppercase hover:gap-6 transition-all"
          >
            <span>Ver Lookbook Completo</span>
            <svg className="w-4 h-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}