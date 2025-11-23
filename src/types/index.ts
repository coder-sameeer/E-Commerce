// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: 'men' | 'women' | 'kids';
  subcategory: string;
  brand?: string;
  images: string[];
  sizes: Size[];
  colors: Color[];
  tags: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Size {
  label: string;
  stock: number;
}

export interface Color {
  name: string;
  hex: string;
  images?: string[];
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'customer' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface UserFormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  total: number;
  itemCount: number;
}

// Order Types
export interface Order {
  id: string;
  userId?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  totalAmount: number;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: 'stripe' | 'paypal';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productSnapshot: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  size: string;
  color: string;
  price: number;
}

// Address Types
export interface Address {
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

// Filter and Search Types
export interface ProductFilters {
  category?: string;
  subcategory?: string;
  sizes?: string[];
  colors?: string[];
  priceRange?: [number, number];
  brands?: string[];
  sortBy?: 'popular' | 'new' | 'price_low' | 'price_high';
  page?: number;
  limit?: number;
}

export interface SearchResult {
  products: Product[];
  totalCount: number;
  pageCount: number;
  currentPage: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Admin Types
export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  revenue: number;
  todayOrders: number;
  todayRevenue: number;
}

export interface ProductStats {
  totalProducts: number;
  lowStockProducts: number;
  outOfStockProducts: number;
  featuredProducts: number;
}

// Payment Types
export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

export interface PayPalOrderData {
  id: string;
  status: string;
  links: Array<{
    rel: string;
    href: string;
  }>;
}

// Navigation Types
export type Category = 'men' | 'women' | 'kids';
export type Subcategory = string;