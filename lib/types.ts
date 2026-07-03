export type CategorySeed = {
  name: string;
  slug: string;
  description: string;
  image: string;
};

export type ProductSeed = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  compareAt?: number;
  inventory: number;
  rating: number;
  reviewCount: number;
  featured?: boolean;
  active?: boolean;
  categorySlug: string;
  images: string[];
  attributes: Record<string, string>;
};

export type CartLine = {
  product: ProductSeed;
  quantity: number;
};
