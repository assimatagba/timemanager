import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import store from './store/store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Raphael from 'raphael/raphael'
import VueJWT from 'vuejs-jwt'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'


global.Raphael = Raphael;

const router = createRouter(store);
Vue.use(BootstrapVue)
Vue.use(Datetime)
Vue.use(IconsPlugin)
Vue.use(VueJWT, {signKey : "secret"})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
