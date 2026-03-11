// src/types/product.type.ts

export interface Product {
  _id: string;
  name: string;
  brand: string;
  country?: string;
  region?: string;
  image?: string;
  size?: string;
  roastLevel?: string;
  flavourProfile?: string;
  price: number;
  createdAt?: string;
  updatedAt?: string;
}
