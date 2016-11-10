import Vue from 'vue'
import store from './store'
import App from './components/App.vue'

new Vue({
  store,
  el: '#app',
//  template: '<App/>',
  render: h => h(App)
})
