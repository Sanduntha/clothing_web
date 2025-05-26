export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  category: string;
  isNew: boolean;
  isFeatured: boolean;
  inStock: boolean;
  sizes?: string[];
  colors?: string[];
  rating: number;
  reviews: number;
  date: string;
}