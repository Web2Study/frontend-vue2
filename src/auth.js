/* globals localStorage */
import * as userMgr from './api/userMgr'
export default {
  login (mobile, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (userMgr.curUser()) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    requestLogin(mobile, pass, (res) => {
      if (res.authenticated) {
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  logout (cb) {
    userMgr.logout()
    .then(()=>{
       if (cb) cb()
       this.onChange(false)
    })
  },

  loggedIn () {
    return !!userMgr.curUser()
  },

  onChange () {}
}

function requestLogin (mobile, pass, cb) {
  userMgr.login(mobile,pass).then(user=>{
      cb({
        authenticated: true
      })
    }).catch(function (err) {
      cb({ authenticated: false })
    })
  
}
