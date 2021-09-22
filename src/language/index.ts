import { createI18n } from 'vue-i18n'
import en from './package/en.json'
import zh from './package/zh-cn.json'

const messages = {
  en_US: {
    ...en
  },
  zh_CN: {
    ...zh
  }
}

interface langType {
  a: string | undefined
}

interface Name {
  name: string
}

export function getLanguage() {
  let lang: string | undefined = 'en_US' // 默认为英文
  const localLang = localStorage.getItem('lang')
  if (localLang) {
    lang = localLang
  } else {
    const language = navigator.language
    const locales = Object.keys(messages)
    for (const locale of locales) {
      if (language.indexOf(locale) > -1) {
        lang = locale
      }
    }
  }
  return lang
}

const i18n = createI18n({
  locale: getLanguage(), // set locale
  messages // set locale messages
})

export function setLanguage(lang: string) {
  localStorage.setItem('lang', lang)
  i18n.global.locale = lang
}

export default i18n
