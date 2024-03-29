import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import swedish from './languages/sv.json'
import finnish from './languages/fi.json'

i18n.use(initReactI18next).init({
    resources: {},
    defaultNS: 'app',
    keySeparator: false, // we do not use keys in form messages.welcome
    // If the user changes the language, then the localStorage should be updated to that lanugage key
    lng: localStorage.getItem('language') ?? 'fi',
    interpolation: {
        escapeValue: false, // react already safes from xss
    },
})

i18n.addResourceBundle('sv', 'app', swedish)
i18n.addResourceBundle('fi', 'app', finnish)
