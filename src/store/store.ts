import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../store/reducers/cartSlice";
import userSlice from "./reducers/userSlice";
import { persistedCartSlice, persistedFavoritesSlice } from "./persisted/persistConfig";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: {
    cartSlice: persistedCartSlice,
    userSlice,
    favoritesSlice: persistedFavoritesSlice,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
