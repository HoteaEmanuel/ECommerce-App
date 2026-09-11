import { useTranslation } from "react-i18next";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppButtomTabs";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import MyOrdersScreen from "../screens/profile/MyOrdersScreen";

const Stack = createStackNavigator();

export default function MainAppStack() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
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
