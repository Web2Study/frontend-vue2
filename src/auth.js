/* globals localStorage */
import API from './api'
export default {
  sigin (mobile, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (API.userMgr.curUser()) {
      if (cb) cb(true)
      this.onChange(true)
      return
    }
    requestLogin(mobile, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  logout (cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
   // return !!API.userMgr.curUser()
    return !!localStorage.token
  },

  onChange () {}
}

function requestLogin (mobile, pass, cb) {
  API.userMgr.login(mobile,pass).then(user=>{
      cb({
        authenticated: true,
        token: user.idToken
      })
    }).catch(function (err) {
      cb({ authenticated: false })
    })
  
}
