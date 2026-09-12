import i18n from "../localization/i18n";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { Product } from "../types/product";
import type { Order } from "../types/order";
import { getImageURLs } from "../helpers/productImages";

export const getProductsData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    const list: Product[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Documents seeded before the multi-image migration only have `imageURL`.
      list.push({ ...data, imageURLs: getImageURLs(data) } as Product);
    });
    return list;
  } catch (error) {
    console.log("Error fetching products: ", error);
    throw error;
  }
};

export const fetchUserData = async (): Promise<Order[]> => {
  const userIdFromFireBase = auth.currentUser?.uid;
  if (!userIdFromFireBase) {
    throw new Error(i18n.t("orders.signInRequired"));
  }

  const userOrdersRef = collection(db, "users", userIdFromFireBase, "orders");
  const querySnapshot = await getDocs(userOrdersRef);

  return querySnapshot.docs.map((document) => ({
    ...(document.data() as Omit<Order, "id">),
    id: document.id,
  }));
};
