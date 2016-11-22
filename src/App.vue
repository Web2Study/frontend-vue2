<template>
  <div class="ui container">
    <div class="ui secondary pointing menu" data-garbage="true">
      <a class="toc item">
        <i class="sidebar icon"></i>
      </a>

      <router-link  to="/" :class="myclass('/')">About</router-link>
      
       <router-link to="/top" :class="myclass('/top')">Top</router-link>
       <router-link to="/new" :class="myclass('/new')">New</router-link>
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
import auth from './auth'

export default {
  computed: {
    loggedIn(){
      return auth.loggedIn()
    } 
  },
  methods: {
    
    myclass(path){
      let cur=this.$route.path
      return {item:true,active:path==cur} 
    }
  },
  created () {
    auth.onChange = loggedIn => {
      this.loggedIn = loggedIn
    }
  }
}
</script>
