import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { TRANSLATIONS_EN, TRANSLATIONS_FR, TRANSLATIONS_AR } from "./translations";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: TRANSLATIONS_EN,
      },
      fr: {
        translation: TRANSLATIONS_FR,
      },
      ar: {
        translation: TRANSLATIONS_AR,
      },
    },
  });

export default i18n;
