import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import type { RootStackParamList } from "./types";

const Stack = createStackNavigator<RootStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
