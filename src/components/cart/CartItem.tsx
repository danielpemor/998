// src/components/cart/CartItem.tsx
import { TrashIcon } from '@heroicons/react/24/outline';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export default function CartItem({
  name,
  price,
  quantity,
  image,
  size,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex py-6 border-b border-gray-200">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80'}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{name}</h3>
            <p className="ml-4">${(price * quantity).toFixed(2)}</p>
          </div>
          {size && <p className="mt-1 text-sm text-gray-500">Talla: {size}</p>}
        </div>
        
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Reducir cantidad"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            
            <span className="text-gray-900 w-8 text-center">{quantity}</span>
            
            <button
              onClick={() => onUpdateQuantity(quantity + 1)}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Aumentar cantidad"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <button
            onClick={onRemove}
            className="text-red-500 hover:text-red-600 transition-colors"
            aria-label="Eliminar del carrito"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}