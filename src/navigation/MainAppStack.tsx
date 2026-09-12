import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppButtomTabs";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import MyOrdersScreen from "../screens/profile/MyOrdersScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUserData } from "../store/reducers/userSlice";
import { useEffect } from "react";
import { RootState } from "../store/store";
import { ActivityIndicator } from "react-native";

const Stack = createStackNavigator();

export default function MainAppStack() {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { userData, isLoading } = useSelector(
    (store: RootState) => store.userSlice,
  );

  const isUserLoggedIn = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("USER_DATA");
      if (storedUserData) dispatch(setUserData(JSON.parse(storedUserData)));
    } catch (error) {
      console.error("Error reading stored user: ", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  if (isLoading) return <ActivityIndicator size="large" />;
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={userData ? "MainAppBottomTabs" : "AuthStack"}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainAppBottomTabs" component={MainAppBottomTabs} />
      <Stack.Screen
        name="CheckoutScreen"
        options={{
          headerShown: true,
          title: t("navigation.checkout"),
        }}
        component={CheckoutScreen}
      />

      <Stack.Screen
        name="MyOrdersScreen"
        options={{ headerShown: true, title: t("navigation.orders") }}
        component={MyOrdersScreen}
      />
    </Stack.Navigator>
  );
}
