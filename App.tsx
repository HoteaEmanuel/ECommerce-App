import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SignInScreen from "./src/screens/auth/SignInScreen";
import AuthStack from "./src/navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
