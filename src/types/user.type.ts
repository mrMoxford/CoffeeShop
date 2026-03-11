// src/types/user.type.ts

import { Product } from "./product.type";

export interface User {
  _id: string;

  name: string;
  username: string;
  email: string;

  isAdmin: boolean;

  img?: string;

  favorites: Product[] | string[];

  createdAt?: string;
  updatedAt?: string;
}
