// src/components/shop/PriceFilter.tsx
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Input from '../ui/Input';

interface PriceFilterProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

export default function PriceFilter({ min, max, onChange }: PriceFilterProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  const handleApply = () => {
    onChange(minPrice, maxPrice);
  };

  return (
    <div className="border-b border-gray-200 pb-6">
      <h3 className="flow-root">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between text-sm text-gray-900 hover:text-gray-700"
        >
          <span className="font-medium">Precio</span>
          <span className="ml-6 flex items-center">
            <ChevronDownIcon
              className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </span>
        </button>
      </h3>
      
      {isOpen && (
        <div className="pt-6">
          <div className="flex items-center space-x-3">
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full"
            />
            <span className="text-gray-500">-</span>
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <button
            onClick={handleApply}
            className="mt-4 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            Aplicar
          </button>
        </div>
      )}
    </div>
  );
}