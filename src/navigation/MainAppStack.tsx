import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppButtomTabs";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import MyOrdersScreen from "../screens/profile/MyOrdersScreen";
import { useEffect, useState } from "react";

import { ActivityIndicator } from "react-native";
import { View } from "react-native";
import { AppColors } from "../styles/colors";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../config/firebase";
import type { RootStackParamList } from "./types";
const Stack = createStackNavigator<RootStackParamList>();

export default function MainAppStack() {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<object | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (userFromFirebase) => {
      if (userFromFirebase) {
        setIsLoading(false);
        setUserData(userFromFirebase);
      }
      setIsLoading(false);
    });
  }, []);
  if (isLoading)
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={AppColors.primary} />;
      </View>
    );
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
