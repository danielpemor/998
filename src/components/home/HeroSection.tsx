// src/components/home/HeroSection.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 w-full h-[120%]"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1920&q=90"
        >
          <source 
            src="https://cdn.coverr.co/videos/coverr-woman-modeling-clothes-1005/1080p.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 h-full flex items-center"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.span 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-white/80 text-sm tracking-[0.3em] uppercase mb-6 block"
              >
                Colección SS24
              </motion.span>
              
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-6xl md:text-8xl lg:text-9xl font-light text-white leading-[0.9] mb-8"
              >
                REDEFINIENDO
                <br />
                <span className="italic font-serif">el lujo</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-xl text-white/70 max-w-lg mb-12 font-light leading-relaxed"
              >
                Una colección que fusiona la elegancia atemporal con la innovación contemporánea
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="flex flex-wrap gap-6"
              >
                <a 
                  href="/shop"
                  className="group relative inline-block"
                >
                  <span className="relative z-10 block px-12 py-5 text-sm tracking-[0.2em] text-white border border-white/30 backdrop-blur-sm transition-all duration-500 group-hover:text-black group-hover:bg-white">
                    DESCUBRIR COLECCIÓN
                  </span>
                  <div className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </a>

                <a 
                  href="/lookbook"
                  className="inline-block px-12 py-5 text-sm tracking-[0.2em] text-white/70 hover:text-white transition-colors duration-300"
                >
                  VER LOOKBOOK
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-white/50"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}