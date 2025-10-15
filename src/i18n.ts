import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

// 🌍 Auto Language Detection + Dynamic JSON Loader
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: navigator.language.split('-')[0], // Auto-detects browser language (e.g. 'en', 'fr', 'ar')
    fallbackLng: 'en', // Default to English
    debug: false,
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Loads each language JSON dynamically
    },
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
    },
  });

export default i18n;
