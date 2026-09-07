import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import CartScreen from "../screens/cart/CartScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainAppBottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
