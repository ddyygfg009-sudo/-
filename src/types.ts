
export interface Product {
  id: string;
  name: string;
  image: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  products: Product[];
}

export type ViewState = 'home' | 'products' | 'social' | 'offers' | 'profile';
