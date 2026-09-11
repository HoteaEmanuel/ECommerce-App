import type { Timestamp } from "firebase/firestore";
import type { Product } from "./product";

export type OrderItem = Omit<Product, "id"> & {
  id: number | string;
  qty: number;
  sum: number;
};

export type Order = {
  id: string;
  fullName: string;
  phoneNumber: string;
  detailedAddress: string;
  items: OrderItem[];
  totalProductPrices: number;
  totalPrice: number;
  createdAt: Timestamp;
};
