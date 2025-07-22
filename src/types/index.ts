export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  ingredients?: string[];
  benefits?: string[];
  usage?: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface Customer {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  paymentMethod: string;
  shippingMethod: string;
  promoCode?: string;
}