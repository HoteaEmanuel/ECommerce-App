# Localization

The app uses i18next and react-i18next, with 58 messages per JSON file in `locales/`.
English, Mandarin Chinese (Simplified script), Hindi, Spanish, Modern Standard
Arabic, French, Bengali, Portuguese (Brazilian wording), Russian, and Indonesian
cover the ten largest languages by total speakers in the 2025 Ethnologue-based
[ranking](https://www.langoly.com/most-spoken-languages/). Romanian is also included.

The first supported device language is used on first launch, with English as the
fallback. Profile → Language lets users choose a language and confirm it.
AsyncStorage saves this preference, and startup waits for it to be restored.
Arabic uses right-to-left layout/text and navigation direction without restarting.
Language names are shown in their own scripts so users can find their language.

UI text, accessibility labels, form errors, navigation titles, prices, and dates
use the active locale. Validation schemas store translation keys so an existing
error changes language when the UI does. Currency remains USD; localization does
not convert monetary values. Product names, brand artwork, and user-entered or
stored order data retain their original content.

Add new messages to every JSON file and use `useTranslation()` in components.
Use `i18n.t()` at call time in services. Do not translate labels at module load.
Run `npm run test:localization` to check coverage, interpolation, preference
restoration, fallback behavior, language switching, and formatting.
