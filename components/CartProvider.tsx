"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CartLine, ProductSeed } from "@/lib/types";

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  add: (product: ProductSeed, quantity?: number) => void;
  update: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "northstar-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved) setLines(JSON.parse(saved));
    } catch {
      window.localStorage.removeItem(KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(KEY, JSON.stringify(lines));
  }, [hydrated, lines]);

  const value = useMemo<CartContextValue>(() => ({
    lines,
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal: lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0),
    add(product, quantity = 1) {
      setLines((current) => {
        const found = current.find((line) => line.product.id === product.id);
        if (found) {
          return current.map((line) => line.product.id === product.id
            ? { ...line, quantity: Math.min(line.quantity + quantity, product.inventory) }
            : line
          );
        }
        return [...current, { product, quantity: Math.min(quantity, product.inventory) }];
      });
    },
    update(productId, quantity) {
      setLines((current) => quantity <= 0
        ? current.filter((line) => line.product.id !== productId)
        : current.map((line) => line.product.id === productId
          ? { ...line, quantity: Math.min(quantity, line.product.inventory) }
          : line
        )
      );
    },
    remove(productId) {
      setLines((current) => current.filter((line) => line.product.id !== productId));
    },
    clear() {
      setLines([]);
    }
  }), [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
