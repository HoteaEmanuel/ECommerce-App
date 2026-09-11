import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Product } from "../types/product";

export const getProductsData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    const list: Product[] = [];
    querySnapshot.forEach((doc) => list.push(doc.data() as Product));
    return list;
  } catch (error) {
    console.log("Error fetching products: ", error);
  }
};
