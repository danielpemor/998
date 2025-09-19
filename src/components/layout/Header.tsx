// src/components/layout/Header.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CartButton from '../cart/CartButton';
import MobileMenu from './MobileMenu';
import SearchModal from './SearchModal';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { name: 'NUEVO', slug: 'new' },
    { name: 'MUJER', slug: 'mujer' },
    { name: 'HOMBRE', slug: 'hombre' },
    { name: 'ACCESORIOS', slug: 'accesorios' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
        }`}
      >
        {/* Announcement Bar */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              initial={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-black text-white text-center overflow-hidden"
            >
              <p className="py-2 text-xs tracking-wider">
                ENVÍO GRATIS EN PEDIDOS SUPERIORES A $100
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <motion.h1 
                whileHover={{ scale: 1.05 }}
                className="text-3xl font-light tracking-widest"
              >
                TIENDA
              </motion.h1>
            </a>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center space-x-12">
              {categories.map((category, index) => (
                <motion.a
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="text-sm tracking-wide hover:opacity-70 transition-opacity"
                >
                  {category.name}
                </motion.a>
              ))}
              <motion.a
                href="/about"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -2 }}
                className="text-sm tracking-wide hover:opacity-70 transition-opacity"
              >
                SOBRE NOSOTROS
              </motion.a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:block hover:opacity-70 transition-opacity"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>
              
              <CartButton />
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Spacer */}
      <div className={isScrolled ? 'h-20' : 'h-[88px]'} />

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}