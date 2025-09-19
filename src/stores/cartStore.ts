// src/stores/cartStore.ts
import { persistentAtom } from '@nanostores/persistent';
import { computed } from 'nanostores';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  image?: string;
}

export const cartItems = persistentAtom<CartItem[]>('cart', [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const cartTotal = computed(cartItems, (items) =>
  items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const cartCount = computed(cartItems, (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export function addToCart(item: Omit<CartItem, 'id'>) {
  const id = `${item.productId}-${item.size || 'default'}-${item.color || 'default'}`;
  const currentItems = cartItems.get();
  const existingItem = currentItems.find((i) => i.id === id);

  if (existingItem) {
    cartItems.set(
      currentItems.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
      )
    );
  } else {
    cartItems.set([...currentItems, { ...item, id }]);
  }
}

export function removeFromCart(id: string) {
  cartItems.set(cartItems.get().filter((item) => item.id !== id));
}

export function updateQuantity(id: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }
  
  cartItems.set(
    cartItems.get().map((item) =>
      item.id === id ? { ...item, quantity } : item
    )
  );
}

export function clearCart() {
  cartItems.set([]);
}