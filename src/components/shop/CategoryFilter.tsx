// src/components/shop/CategoryFilter.tsx
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface CategoryFilterProps {
  categories: Array<{ id: string; name: string; slug: string }>;
  selected: string[];
  onChange: (categories: string[]) => void;
}

export default function CategoryFilter({ categories, selected, onChange }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleCategory = (categoryId: string) => {
    if (selected.includes(categoryId)) {
      onChange(selected.filter(id => id !== categoryId));
    } else {
      onChange([...selected, categoryId]);
    }
  };

  return (
    <div className="border-b border-gray-200 pb-6">
      <h3 className="flow-root">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between text-sm text-gray-900 hover:text-gray-700"
        >
          <span className="font-medium">Categorías</span>
          <span className="ml-6 flex items-center">
            <ChevronDownIcon
              className={`h-5 w-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </span>
        </button>
      </h3>
      
      {isOpen && (
        <div className="pt-6 space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                id={category.id}
                type="checkbox"
                checked={selected.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <label
                htmlFor={category.id}
                className="ml-3 text-sm text-gray-600 cursor-pointer hover:text-gray-900"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}