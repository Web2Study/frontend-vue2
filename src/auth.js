/* globals localStorage */
import { curUser,login} from './store/api'
export default {
  sigin (mobile, pass, cb) {
    cb = arguments[arguments.length - 1]
    if (curUser()) {
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
   // delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    return !!curUser()
    //!!localStorage.token
  },

  onChange () {}
}

function requestLogin (mobile, pass, cb) {
  login(mobile,pass).then(user=>{
      cb({
        authenticated: true,
        token: user.idToken
      })
    }).catch(function (err) {
      cb({ authenticated: false })
    })
  
}
