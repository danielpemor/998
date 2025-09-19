// src/components/home/EditorialFeatures.tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function EditorialFeatures() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const features = [
    {
      title: "CRAFTED IN ITALY",
      subtitle: "Artesanía Italiana",
      description: "Cada pieza es meticulosamente elaborada por artesanos italianos, garantizando la máxima calidad y atención al detalle.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=90",
      link: "/about"
    },
    {
      title: "SUSTAINABLE LUXURY",
      subtitle: "Lujo Sostenible",
      description: "Comprometidos con prácticas éticas y materiales sostenibles sin comprometer el estilo.",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=90",
      link: "/sustainability"
    },
    {
      title: "TIMELESS DESIGN",
      subtitle: "Diseño Atemporal",
      description: "Piezas diseñadas para trascender temporadas y tendencias, creando un guardarropa duradero.",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=90",
      link: "/philosophy"
    }
  ];

  return (
    <section ref={ref} className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-6">Nuestra Filosofía</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Donde la tradición se encuentra con la innovación
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group"
            >
              <a href={feature.link} className="block">
                <div className="relative aspect-[3/4] overflow-hidden mb-8">
                  <img 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-xs tracking-[0.3em] text-gray-500 uppercase">
                      {feature.title}
                    </span>
                    <h3 className="text-2xl font-light mt-2">{feature.subtitle}</h3>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-sm tracking-wider group-hover:gap-4 transition-all">
                    <span>DESCUBRIR MÁS</span>
                    <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}