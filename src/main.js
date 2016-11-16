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

/*
var config = {
  syncURL: "https://books-t.wilddogio.com" //输入节点 URL
}
wilddog.initializeApp(config);
const api  = wilddog.sync().ref();
*/
const app = new Vue({
  router,
  store,
  ...App // Object spread copying everything from App.vue
})

app.$mount('#app')
