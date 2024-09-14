import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files
import enTranslations from "./locales/en/translation.json";
import skTranslations from "./locales/sk/translation.json";

i18n
  .use(initReactI18next) // Connect with React
  .init({
    resources: {
      en: {
        translation: enTranslations,
      },
      sk: {
        translation: skTranslations,
      },
    },
    supportedLngs: ["sk", "en"],
    fallbackLng: "sk", // Fallback language if current language has no translations
    detection: {
      order: ["localStorage", "htmlTag", "path", "subdomain"],
      caches: ["localStorage"], // Cache the selected language
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false, // Optional if you want to avoid React suspense
    },
  });

export default i18n;
