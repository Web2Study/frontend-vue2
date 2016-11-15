<template>
  <div class="ui container">
    <div class="ui large secondary menu">
      <a class="toc item">
        <i class="sidebar icon"></i>
      </a>

      <router-link class="active item" to="/about">About</router-link>
      <router-link class="item" to="/dashboard">Dashboard</router-link>

      <div class="right item">
        <router-link class="ui  button" v-if="loggedIn" to="/logout">Log out</router-link>
        <router-link class="ui primary  button" v-if="!loggedIn" to="/login">Log in</router-link>
      </div>
    </div>

    <template v-if="$route.matched.length">
      <router-view></router-view>
    </template>
    <template v-else>
      <p>You are logged {{ loggedIn ? 'in' : 'out' }}</p>
    </template>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data () {
    return {
      loggedIn: auth.loggedIn()
    }
  },
  created () {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn
    }
  }
}
</script>
