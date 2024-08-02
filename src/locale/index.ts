import { createI18n } from 'vue-i18n'
import en from './lang/en'

const messages = {
	en: en
}
let localLang = navigator.language.split('-')[0] || 'en'
if (Object.keys(localLang).indexOf(localLang) < 0) {
	localLang = 'en'
}
const i18n = createI18n({
	globalInjection: true,
	locale: localLang,
	messages,
	legacy: false
})
export default i18n
