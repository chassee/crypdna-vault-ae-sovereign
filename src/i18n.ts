import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import jp from './locales/jp/translation.json';
import ar from './locales/ar/translation.json';
import fr from './locales/fr/translation.json';
import de from './locales/de/translation.json';
import es from './locales/es/translation.json';
import zh from './locales/zh/translation.json';
import ru from './locales/ru/translation.json';
import hi from './locales/hi/translation.json';
import pt from './locales/pt/translation.json';
import it from './locales/it/translation.json';
import kr from './locales/kr/translation.json';
import id from './locales/id/translation.json';
import tr from './locales/tr/translation.json';
import th from './locales/th/translation.json';
import vi from './locales/vi/translation.json';
import ae from './locales/ae/translation.json';
import ng from './locales/ng/translation.json';
import za from './locales/za/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      jp: { translation: jp },
      ar: { translation: ar },
      fr: { translation: fr },
      de: { translation: de },
      es: { translation: es },
      zh: { translation: zh },
      ru: { translation: ru },
      hi: { translation: hi },
      pt: { translation: pt },
      it: { translation: it },
      kr: { translation: kr },
      id: { translation: id },
      tr: { translation: tr },
      th: { translation: th },
      vi: { translation: vi },
      ae: { translation: ae },
      ng: { translation: ng },
      za: { translation: za },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
