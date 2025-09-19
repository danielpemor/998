import { atom, computed } from 'nanostores';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

export const cartItems = atom<CartItem[]>([]);

export const cartTotal = computed(cartItems, items =>
  items.reduce((total, item) => total + (item.price * item.quantity), 0)
);

export function addToCart(product: CartItem) {
  if (!product.id || !product.name || product.price < 0 || !product.size) {
  console.error('Invalid product data');
  return;
}

// Sanitizar nombre del producto
product.name = product.name.replace(/<[^>]*>?/gm, '');

// Límite de items en el carrito
if (cartItems.get().length >= 50) {
  console.warn('Cart limit reached');
  return;
}
  const items = cartItems.get();
  const existingItem = items.find(
    item => item.id === product.id && item.size === product.size
  );

  if (existingItem) {
    cartItems.set(items.map(item =>
      item.id === product.id && item.size === product.size
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  } else {
    cartItems.set([...items, { ...product, quantity: 1 }]);
  }
}

export function removeFromCart(id: string, size: string) {
  cartItems.set(cartItems.get().filter(
    item => !(item.id === id && item.size === size)
  ));
}

export function updateQuantity(id: string, size: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(id, size);
    return;
  }

  cartItems.set(cartItems.get().map(item =>
    item.id === id && item.size === size
      ? { ...item, quantity }
      : item
  ));
}