import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import { createListView } from '../views/CreateListView'
import ItemView from '../views/ItemView.vue'
import UserView from '../views/UserView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import auth from '../auth'

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  
  routes: [
    { path: '/', component: AboutView },
    { path: '/login', component: LoginView },
    { path: '/top/:page(\\d+)?', component: createListView('top') , beforeEnter: requireAuth},
    { path: '/new/:page(\\d+)?', component: createListView('new') , beforeEnter: requireAuth},
 
    { path: '/item/:id(\\d+)', component: ItemView , beforeEnter: requireAuth},
    { path: '/user/:id', component: UserView , beforeEnter: requireAuth},
    { path: '/logout', beforeEnter (to, from, next) {
        auth.logout()
        next('/')
      }
    },
    { path: '*', redirect: '/' }
  ]
})
