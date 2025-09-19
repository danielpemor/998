// src/components/cart/CartButton.tsx
import { useStore } from '@nanostores/react';
import { cartCount } from '../../stores/cartStore';
import { motion } from 'framer-motion';

interface CartButtonProps {
  onClick?: () => void;
}

export default function CartButton({ onClick }: CartButtonProps) {
  const count = useStore(cartCount);

  const handleClick = () => {
    // Si no se proporciona onClick, disparar evento personalizado
    if (onClick) {
      onClick();
    } else {
      // Disparar evento que el Layout escuchará
      const event = new CustomEvent('open-cart');
      document.dispatchEvent(event);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="relative group flex items-center space-x-2 hover:opacity-70 transition-opacity"
      aria-label="Abrir carrito"
    >
      <span className="text-sm tracking-wide hidden lg:inline">CART</span>
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-sm"
        >
          ({count})
        </motion.span>
      )}
      <svg className="h-5 w-5 lg:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    </motion.button>
  );
}