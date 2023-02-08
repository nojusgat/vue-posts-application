import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from './router'
import store from './store'

Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3000/"
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
