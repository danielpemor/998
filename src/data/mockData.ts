// src/data/mockData.ts
export const mockCategories = [
  { id: '1', name: 'Hombre', slug: 'hombre' },
  { id: '2', name: 'Mujer', slug: 'mujer' },
  { id: '3', name: 'Accesorios', slug: 'accesorios' },
];

export const mockProducts = [
  {
    id: '1',
    name: 'Camiseta Essential',
    slug: 'camiseta-essential',
    description: 'Camiseta de algodón orgánico',
    price: 49.99,
    stock: 10,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'],
    category: mockCategories[0],
    sizes: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 3 },
      { size: 'L', stock: 2 },
    ],
    featured: true,
  },
  {
    id: '2',
    name: 'Pantalón Chino',
    slug: 'pantalon-chino',
    description: 'Pantalón chino clásico',
    price: 89.99,
    sale_price: 69.99,
    stock: 15,
    images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80'],
    category: mockCategories[0],
    sizes: [
      { size: '30', stock: 5 },
      { size: '32', stock: 5 },
      { size: '34', stock: 5 },
    ],
    featured: true,
  },
];

export const mockHeroSection = {
  title: 'Nueva Colección',
  subtitle: 'Descubre las últimas tendencias',
  cta_text: 'Ver Colección',
  cta_link: '/shop',
  background_image: {
    filename_disk: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80'
  },
  overlay_opacity: 0.3,
  text_color: '#FFFFFF'
};