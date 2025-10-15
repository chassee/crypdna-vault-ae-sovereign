import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// 🌍 Auto-detect + load 19 languages dynamically
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    supportedLngs: [
      'en', 'fr', 'es', 'de', 'it', 'ja', 'ko', 'zh', 'ar', 'hi', 'ru', 'pt', 
      'nl', 'tr', 'sv', 'pl', 'th', 'id', 'vi'
    ],
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage']
    },
    backend: {
      // 🔁 Automatically fetch JSONs from CDN or your server
      loadPath: 'https://cdn.jsdelivr.net/gh/chassee/crypdna-translations/{{lng}}.json'
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
