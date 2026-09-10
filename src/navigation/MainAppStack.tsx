import { createStackNavigator } from "@react-navigation/stack";
import AuthStack from "./AuthStack";
import MainAppBottomTabs from "./MainAppButtomTabs";
import CheckoutScreen from "../screens/cart/CheckoutScreen";
import MyOrdersScreen from "../screens/profile/MyOrdersScreen";

const Stack = createStackNavigator();

export default function MainAppStack() {
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
        }}
        component={CheckoutScreen}
      />

      <Stack.Screen
        name="MyOrdersScreen"
        
        options={{ headerShown: true, title:'My Orders' }}
        component={MyOrdersScreen}
      />
    </Stack.Navigator>
  );
}
