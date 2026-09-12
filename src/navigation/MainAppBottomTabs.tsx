import { useTranslation } from "react-i18next";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import CartScreen from "../screens/cart/CartScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import FavoritesScreen from "../screens/favorites/FavoritesScreen";
import { AppColors } from "../styles/colors";
import { s, vs } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { IS_ANDROID } from "../constants/constants";
import type { RootStackParamList } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
const Tab = createBottomTabNavigator<RootStackParamList>();

export default function MainAppBottomTabs() {
  const { t } = useTranslation();
  const { items } = useSelector((store: RootState) => store.cartSlice);
  const cartItemCount = items.reduce((sum, item) => sum + item.qty, 0);
  const { items: favoriteItems } = useSelector((store: RootState) => store.favoritesSlice);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.primary,
        tabBarLabelStyle: {
          marginTop: vs(40),
          fontSize: s(12),
        },
        tabBarStyle: IS_ANDROID && {
          height: vs(50),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          title: t("navigation.home"),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Favorites"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
          tabBarBadge: favoriteItems.length > 0 ? favoriteItems.length : undefined,
          tabBarBadgeStyle: {
            backgroundColor: AppColors.redColor,
            fontSize: s(10),
          },
          title: t("navigation.favorites"),
        }}
        component={FavoritesScreen}
      />
      <Tab.Screen
        name="Cart"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: AppColors.redColor,
            fontSize: s(10),
          },
          title: t("navigation.cart"),
        }}
        component={CartScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          title: t("navigation.profile"),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
