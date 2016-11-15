<template>
  <div class="ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui teal image header">
        <img src="../assets/logo.png" class="image">
        <div class="content">
          登录系统
        </div>
      </h2>
      <p v-if="$route.query.redirect">
        你要访问的内容有保护，请先登录系统！
      </p>

      <form class="ui large form">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="email" v-model="email" placeholder="E-mail address">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" v-model="pass" placeholder="Password">
            </div>
          </div>
          <div class="ui  large primary button" @click='login()'>登　录</div>
        </div>
   
         <div  class="ui error message"></div>
      </form>

      <div class="ui message">
        New to us? <a href="#">Sign Up</a>
      </div>
    </div>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  data () {
    return {
      email: 'alex@139.com',
      pass: '1234',
      error: false
    }
  },
  mounted() {
    $('.ui.form')
        .form({
          on: 'blur',
          fields: {
            email: {
              identifier  : 'email',
              rules: [
                {
                  type   : 'empty',
                  prompt : '亲！请输入电子邮件'
                },
                {
                  type   : 'email',
                  prompt : '正确电子邮件，比如lsj@139.com'
                }
              ]
            },
            password: {
              identifier  : 'password',
              rules: [
                {
                  type   : 'empty',
                  prompt : '亲！请输入密码'
                },
                {
                  type   : 'length[4]',
                  prompt : '密码需要4位以上字符'
                }
              ]
            }
          }
        })
    
},
  methods: {
    login () {
      let rt= $('.form').form('validate form')
      if (!rt) return
      auth.login(this.email, this.pass, loggedIn => {
        if (!loggedIn) {
          this.error = true
        } else {
          this.$router.replace(this.$route.query.redirect || '/')
        }
      })
    }
  }
}
</script>

