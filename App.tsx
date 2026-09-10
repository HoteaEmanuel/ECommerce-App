import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import MainAppStack from "./src/navigation/MainAppStack";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./src/store/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("./src/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Medium": require("./src/assets/fonts/Nunito-Medium.ttf"),
  });

  if (!fontsLoaded) return <ActivityIndicator size={"large"} />;
  return (
    <SafeAreaProvider style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>
          <MainAppStack />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
