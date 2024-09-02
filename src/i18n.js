// src/i18n.js

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  supportedLngs: ["sk", "en"],
  fallbackLng: "en",
  detection: {
    order: ["localStorage", "htmlTag", "path", "subdomain"],
    caches: [],
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
