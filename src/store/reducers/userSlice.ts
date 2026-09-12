import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface UserState {
  userData: object | null;
}

const initialState: UserState = {
  userData: null,
};

export const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<object | null>) => {
      state.userData = action.payload;
      AsyncStorage.setItem("USER_DATA", JSON.stringify(action.payload));
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
