// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importação dos namespaces
import translationPT from "./locales/pt.json";
import translationEN from "./locales/en.json";
import personalitiesPT from "./locales/pt/personalities.json";
import personalitiesEN from "./locales/en/personalities.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    ns: ["translation", "personalities"], // <-- declarando os namespaces
    defaultNS: "translation", // <-- esse será o namespace padrão

    resources: {
      pt: {
        translation: translationPT,
        personalities: personalitiesPT,
      },
      en: {
        translation: translationEN,
        personalities: personalitiesEN,
      },
    },
  });

export default i18n;
