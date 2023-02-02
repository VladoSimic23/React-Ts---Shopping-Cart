export interface ProductsI {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
}

export interface CartI {
  id: number;
  title: string;
  amount: number;
  price: number;
}

export interface ProductsStateI {
  currentCategory: string;
  products: ProductsI[];
  cart: CartI[];
  isCartOpen: boolean;
  total: number;
  totalItems: number;
  allCategories: string[];
}

