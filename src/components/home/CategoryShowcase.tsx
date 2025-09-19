// src/components/home/CategoryShowcase.tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';

export default function CategoryShowcase() {
  const categories = [
    {
      name: "Nueva Temporada",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
      link: "/new"
    },
    {
      name: "Mujer",
      image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800&q=80",
      link: "/category/mujer"
    },
    {
      name: "Hombre",
      image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80",
      link: "/category/hombre"
    },
    {
      name: "Accesorios",
      image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=800&q=80",
      link: "/category/accesorios"
    },
    {
      name: "Edición Limitada",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
      link: "/limited"
    }
  ];

  return (
    <section className="py-20">
      {/* Título centrado */}
      <div className="container mx-auto px-4 mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-light text-center"
        >
          Explora nuestras colecciones
        </motion.h2>
      </div>

      <div className="w-full overflow-hidden">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          centeredSlides={false}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            480: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="category-swiper !px-4"
        >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <motion.a
              href={category.link}
              className="block relative group"
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-[500px] overflow-hidden rounded-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Contenido centrado vertical y horizontalmente */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                  <h3 className="text-white text-2xl md:text-3xl font-light mb-4">{category.name}</h3>
                  <div className="flex items-center space-x-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <span className="text-sm tracking-[0.2em] uppercase">DESCUBRIR</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.a>
          </SwiperSlide>
        ))}
              </Swiper>
      </div>

      {/* Custom navigation buttons centrados */}
    </section>
  );
}