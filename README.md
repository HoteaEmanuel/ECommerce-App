# Smart E-Commerce

A React Native / Expo e-commerce app with a Firebase backend: browse products, save favorites, check out, and track past orders — in 11 languages with full RTL support.

## Tech stack

- [Expo](https://docs.expo.dev/versions/v57.0.0/) (SDK 57) / React Native 0.86 / React 19, TypeScript
- Firebase (Auth + Firestore)
- Redux Toolkit + `redux-persist` (cart and favorites persist across app restarts)
- React Navigation (stack + bottom tabs)
- `react-hook-form` + `yup` for form validation
- `i18next` / `react-i18next` for localization

## Features

- Product catalog with multi-image galleries, search and price sorting, pull-to-refresh
- Product details screen with an image slider
- Cart, favorites/wishlist, and order history, each persisted locally
- Checkout that can remember your name, phone and address for next time
- Email/password auth: sign up, sign in, forgot password, change password
- Profile screen with account details and a language picker
- 11 locales (English, Arabic, Bengali, Spanish, French, Hindi, Indonesian, Portuguese, Romanian, Russian, Chinese), including RTL layout for Arabic

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your Firebase web app config:
   ```bash
   cp .env.example .env
   ```
3. Start the dev server:
   ```bash
   npm start
   ```
   Then run on a platform:
   ```bash
   npm run android
   npm run ios
   npm run web
   ```

## Scripts

- `npm run test:localization` — verifies all locale files stay in sync (same keys, matching interpolation variables) and that every translation key used in the app exists.
- `scripts/` contains one-off Firestore seeding/migration scripts for the product catalog — see [scripts/README.md](scripts/README.md).

## Project structure

```
src/
  components/    reusable UI (buttons, cards, inputs, loaders, sliders, ...)
  screens/       one folder per feature area (home, cart, product, profile, auth, favorites)
  navigation/    typed React Navigation stacks and tabs
  store/         Redux slices (cart, favorites, user) and persistence config
  config/        Firebase setup and Firestore data access
  localization/  i18next setup and the 11 locale JSON files
  helpers/       small shared utilities
  types/         shared TypeScript types
```
