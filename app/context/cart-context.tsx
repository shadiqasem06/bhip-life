"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  useCallback,
} from "react";

type CartItem = { quantity?: number };

type CartContextType = {
  cartCount: number;
  updateCartCount: () => void;
};

const CART_EVENT = "bhip-cart-updated";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CART_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CART_EVENT, callback);
  };
}

function getCartCount(): number {
  try {
    const saved = localStorage.getItem("cart");
    const cart: CartItem[] = saved ? JSON.parse(saved) : [];
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  } catch {
    return 0;
  }
}

function getServerSnapshot(): number {
  return 0;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  updateCartCount: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cartCount = useSyncExternalStore(
    subscribe,
    getCartCount,
    getServerSnapshot
  );

  const updateCartCount = useCallback(() => {
    window.dispatchEvent(new Event(CART_EVENT));
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
