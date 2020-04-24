import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './filters'
import VueI18n from 'vue-i18n'
import messages from './lang'

Vue.config.productionTip = false

Vue.use(VueI18n)
export const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages
})

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
