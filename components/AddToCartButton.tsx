"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ProductSeed } from "@/lib/types";

export function AddToCartButton({ product, quantity = 1, className = "" }: { product: ProductSeed; quantity?: number; className?: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      disabled={product.inventory <= 0}
      onClick={() => {
        add(product, quantity);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
      className={`rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300 ${className}`}
    >
      {product.inventory <= 0 ? "Sold out" : added ? "Added to cart" : "Add to cart"}
    </button>
  );
}
