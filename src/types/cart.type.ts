// src/types/cart.type.ts

export interface CartProduct {
  productId: string;
  quantity: number;
}

export interface Cart {
  _id: string;

  userId: string;

  products: CartProduct[];

  createdAt?: string;
  updatedAt?: string;
}
