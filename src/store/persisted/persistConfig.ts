import AsyncStorage from "@react-native-async-storage/async-storage";
import cartSlice from "../reducers/cartSlice";
import favoritesSlice from "../reducers/favoritesSlice";
import { persistReducer } from "redux-persist";
const persistConfig = {
  key: "cart",
  storage: AsyncStorage,
  whiteList: ["ireks"],
};

export const persistedCartSlice = persistReducer(persistConfig, cartSlice);

const favoritesPersistConfig = {
  key: "favorites",
  storage: AsyncStorage,
};

export const persistedFavoritesSlice = persistReducer(favoritesPersistConfig, favoritesSlice);
