// src/components/home/Newsletter.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Por favor ingresa tu email');
      return;
    }
    
    setStatus('loading');
    
    try {
      // Aquí conectarás con tu servicio de email
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus('success');
      toast.success('¡Bienvenido a nuestra comunidad exclusiva!');
      setEmail('');
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('idle');
      toast.error('Algo salió mal. Intenta de nuevo.');
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-black rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
          <h3 className="text-2xl font-light mb-2">¡Gracias por unirte!</h3>
          <p className="text-gray-600">Revisa tu email para tu código de bienvenida</p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mx-auto"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative group">
            <div className="flex items-center border-b-2 border-gray-300 focus-within:border-black transition-colors duration-300">
              <input
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="flex-1 px-4 py-6 bg-transparent text-lg outline-none placeholder-gray-400"
              />
              
              <motion.button
                type="submit"
                disabled={status === 'loading'}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="px-6 py-6 text-sm tracking-[0.2em] uppercase font-medium disabled:opacity-50 relative overflow-hidden min-w-[160px] flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  {status === 'loading' ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center space-x-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-black border-t-transparent rounded-full"
                      />
                      <span>Enviando...</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="submit"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center space-x-3"
                    >
                      <span>Suscribirse</span>
                      <motion.svg
                        animate={{ x: isHovered ? 5 : 0 }}
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </motion.svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: email.length > 0 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-black origin-left"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-gray-500">
              Al suscribirte, aceptas nuestra{' '}
              <a href="/privacy" className="underline hover:text-black transition-colors">
                política de privacidad
              </a>
            </p>
          </motion.div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}