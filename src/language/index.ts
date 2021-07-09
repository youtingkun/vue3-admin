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

const i18n = createI18n({
  locale: 'zh_CN', // set locale
  messages // set locale messages
})

export default i18n
