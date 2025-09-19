// src/components/layout/SearchModal.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');

  const popularSearches = [
    'Vestidos', 'Blazers', 'Camisetas', 'Pantalones', 'Zapatos'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as={motion.div}
          static
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center pt-20 text-center">
              <Dialog.Panel
                as={motion.div}
                initial={{ scale: 0.9, opacity: 0, y: -50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-2xl transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-light">Buscar</h3>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="¿Qué estás buscando?"
                      className="w-full px-12 py-4 text-lg border-b border-gray-200 focus:border-black outline-none transition-colors"
                      autoFocus
                    />
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>

                  <div className="mt-8">
                    <p className="text-sm text-gray-500 mb-4">Búsquedas populares</p>
                    <div className="flex flex-wrap gap-3">
                      {popularSearches.map((term) => (
                        <motion.button
                          key={term}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setQuery(term)}
                          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                        >
                          {term}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}