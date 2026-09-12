import type { Product } from "../types/product";

/**
 * Every route in the app, flattened across the root stack, the auth stack and
 * the bottom tabs. Declaring it globally (below) means `useNavigation()` and
 * `navigation.navigate(...)` are type-checked the same way from any screen,
 * regardless of which navigator actually renders it, matching how this app
 * already navigates across navigator boundaries by bare route name.
 */
export type RootStackParamList = {
  // Root stack (src/navigation/MainAppStack.tsx)
  AuthStack: undefined;
  MainAppBottomTabs: undefined;
  CheckoutScreen: undefined;
  MyOrdersScreen: undefined;
  ProductDetailsScreen: { product: Product };
  ChangePasswordScreen: undefined;

  // Auth stack (src/navigation/AuthStack.tsx)
  SignInScreen: undefined;
  SignUpScreen: undefined;
  ForgotPasswordScreen: undefined;

  // Bottom tabs (src/navigation/MainAppBottomTabs.tsx)
  Home: undefined;
  Favorites: undefined;
  Cart: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
