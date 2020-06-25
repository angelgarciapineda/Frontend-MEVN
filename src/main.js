import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/* Axios */
import axios from 'axios'
import VueAxios from 'vue-axios'
/* Bootstrap-vue */
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueAxios, axios)
// Agregamos la URL base de nuestra API
axios.defaults.baseURL = 'http://localhost:3000/api';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
