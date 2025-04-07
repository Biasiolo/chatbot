// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// 🟢 Importa os arquivos externos
import pt from "./locales/pt.json";
import en from "./locales/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    resources: {
      pt: { translation: pt },
      en: { translation: en },
    },
  });

export default i18n;
