//require('es6-promise').polyfill()
import Vue from 'vue'

import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'
import App from './App'
// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

let cfg=Vue.util.extend({
  router,
  store
}, App)
const app = new Vue(cfg)

app.$mount('#app')
