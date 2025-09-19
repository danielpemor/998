// src/components/cart/CartDrawer.tsx - actualizar estilos
import { useStore } from '@nanostores/react';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { cartItems, cartTotal, removeFromCart, updateQuantity } from '../../stores/cartStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useStore(cartItems);
  const total = useStore(cartTotal);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    <div class="flex-1 overflow-y-auto px-6 py-6">
                      <div class="flex items-center justify-between mb-8">
                        <Dialog.Title class="text-lg font-light tracking-widest">
                          CARRITO
                        </Dialog.Title>
                        <button
                          type="button"
                          class="text-gray-400 hover:text-black"
                          onClick={onClose}
                        >
                          <span class="sr-only">Cerrar</span>
                          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div class="flow-root">
                        {items.length === 0 ? (
                          <div class="text-center py-20">
                            <p class="text-sm text-gray-500">Tu carrito está vacío</p>
                            <button
                              onClick={onClose}
                              class="mt-6 text-sm tracking-wide underline underline-offset-4"
                            >
                              CONTINUAR COMPRANDO
                            </button>
                          </div>
                        ) : (
                          <ul role="list" class="divide-y divide-gray-100">
                            {items.map((item) => (
                              <li key={item.id} class="flex py-6">
                                <div class="h-24 w-20 flex-shrink-0 overflow-hidden">
                                  <img
                                    src={item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'}
                                    alt={item.name}
                                    class="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div class="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div class="flex justify-between">
                                      <h3 class="text-sm">{item.name}</h3>
                                      <p class="ml-4 text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                    {item.size && (
                                      <p class="mt-1 text-xs text-gray-500">Talla: {item.size}</p>
                                    )}
                                  </div>
                                  
                                  <div class="flex flex-1 items-end justify-between">
                                    <div class="flex items-center space-x-2">
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        class="p-1 text-gray-500 hover:text-black"
                                      >
                                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 12H4" />
                                        </svg>
                                      </button>
                                      <span class="text-sm w-8 text-center">{item.quantity}</span>
                                      <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        class="p-1 text-gray-500 hover:text-black"
                                      >
                                        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4v16m8-8H4" />
                                        </svg>
                                      </button>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => removeFromCart(item.id)}
                                      class="text-xs text-gray-500 hover:text-black underline underline-offset-2"
                                    >
                                      Eliminar
                                    </button>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    {items.length > 0 && (
                      <div class="border-t border-gray-100 px-6 py-6">
                        <div class="flex justify-between text-sm mb-6">
                          <p>SUBTOTAL</p>
                          <p>${total.toFixed(2)}</p>
                        </div>
                        
                        <a href="/checkout" class="block w-full">
                          <button class="w-full bg-black text-white py-4 text-sm tracking-widest hover:bg-gray-900 transition-colors">
                            FINALIZAR COMPRA
                          </button>
                        </a>
                        
                        <button
                          onClick={onClose}
                          class="w-full mt-3 text-sm tracking-wide underline underline-offset-4"
                        >
                          CONTINUAR COMPRANDO
                        </button>
                        
                        <p class="mt-6 text-xs text-gray-500 text-center">
                          Envío gratis en pedidos superiores a $100
                        </p>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}