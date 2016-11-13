<template>
<div id="login" class="ui middle aligned center aligned grid">
    <div class="column">
      <h2 class="ui teal  header">
        <div class="content">
          登录系统
        </div>
      </h2>

      <form class="ui large form">

        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="email" v-model="user.email" placeholder="例如:alex@139.com">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" v-model="user.password" placeholder="请输入4-10位长度的字母或数字作为密码">
            </div>
          </div>


           <div class="ui  large primary button" @click='check()'>登　录</div>

        </div>
         <div id="errmsg" class="ui error message"></div>
    
      
      </form>
         <div class="ui message">
           还未注册? <a class="item">注　册</a>
        </div>
    </div>
  </div>


</template>

<script>

export default {
   data: ()=>{
      return {user:{email:'',password:''}} //test@139.com
   },
   methods:{
     check(){
       // validationRules = $('.form').form('get validation rules', 'input.email')
        let rt= $('.form').form('validate form')
        if(rt) alert('OK')
     } 
   },
   ready() {
      $('.ui.form')
        .form({
          on: 'blur',
          fields: {
            email: {
              identifier  : 'email',
              rules: [
                {
                  type   : 'empty',
                  prompt : '密码不能为空'
                },
                {
                  type   : 'email',
                  prompt : '电子邮箱格式错误，正确格式：yourname@abc.com'
                }
              ]
            },
            password: {
              identifier  : 'password',
              rules: [
                {
                  type   : 'empty',
                  prompt : '密码不能为空'
                },
                {
                  type   : 'length[4]',
                  prompt : '密码长度应大于4位字符'
                }
              ]
            }
          }
        })
      ;
    },
  
  		
}
</script>

<style lang="stylus">
h2
  color #42b983
#login
  margin-top 80px
</style>
