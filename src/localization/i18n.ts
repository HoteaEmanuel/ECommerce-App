import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import en from "./locales/en.json";
import zh from "./locales/zh.json";
import hi from "./locales/hi.json";
import es from "./locales/es.json";
import ar from "./locales/ar.json";
import fr from "./locales/fr.json";
import bn from "./locales/bn.json";
import pt from "./locales/pt.json";
import ru from "./locales/ru.json";
import id from "./locales/id.json";
import ro from "./locales/ro.json";

export const languages = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文（简体）" },
  { code: "hi", label: "हिन्दी" },
  { code: "es", label: "Español" },
  { code: "ar", label: "العربية" },
  { code: "fr", label: "Français" },
  { code: "bn", label: "বাংলা" },
  { code: "pt", label: "Português" },
  { code: "ru", label: "Русский" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "ro", label: "Română" },
] as const;
export type LanguageCode = (typeof languages)[number]["code"];
const LANGUAGE_KEY = "@smartecommerce/language";
export const isLanguageCode = (code: unknown): code is LanguageCode =>
  languages.some((language) => language.code === code);

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  hi: { translation: hi },
  es: { translation: es },
  ar: { translation: ar },
  fr: { translation: fr },
  bn: { translation: bn },
  pt: { translation: pt },
  ru: { translation: ru },
  id: { translation: id },
  ro: { translation: ro },
};
const deviceLanguage =
  getLocales()
    .map((locale) => locale.languageCode)
    .find(isLanguageCode) ?? "en";
const initialized = i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage,
  supportedLngs: languages.map(({ code }) => code),
  load: "languageOnly",
  initAsync: false,
  fallbackLng: "en",
  defaultNS: "translation",
  ns: ["translation"],
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export const localizationReady = (async () => {
  await initialized;
  try {
    const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
    if (isLanguageCode(saved)) await i18n.changeLanguage(saved);
  } catch (error) {
    console.warn("Unable to restore language preference:", error);
  }
})();

export async function changeAppLanguage(code: LanguageCode) {
  if (!isLanguageCode(code)) throw new Error("Unsupported language");
  await AsyncStorage.setItem(LANGUAGE_KEY, code);
  await i18n.changeLanguage(code);
}

export default i18n;
