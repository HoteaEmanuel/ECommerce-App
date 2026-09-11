import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import MainAppStack from "./src/navigation/MainAppStack";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import FlashMessage from "react-native-flash-message";
import i18n, { localizationReady } from "./src/localization/i18n";
import { I18nextProvider, useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
export default function App() {
  const { i18n: activeI18n } = useTranslation();
  const [languageReady, setLanguageReady] = useState(false);
  useEffect(() => {
    let mounted = true;
    void localizationReady.then(() => { if (mounted) setLanguageReady(true); });
    return () => { mounted = false; };
  }, []);
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("./src/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Medium": require("./src/assets/fonts/Nunito-Medium.ttf"),
  });

  if (!fontsLoaded || !languageReady) return <ActivityIndicator size={"large"} />;
  return (
    <SafeAreaProvider style={[styles.container, { direction: activeI18n.dir() }]}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <NavigationContainer direction={activeI18n.dir()}>
            <MainAppStack />
          </NavigationContainer>

          <FlashMessage position="top" />
        </I18nextProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
