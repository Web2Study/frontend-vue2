import wilddog from 'wilddog'
import api from './create-api'
let userMgr={}

userMgr.curUser=()=>{
  return  wilddog.auth().currentUser
}

userMgr.createUser=async (phone,password)=>{
   await wilddog.auth().createUserWithPhoneAndPassword(phone,password)
   let user =  wilddog.auth().currentUser
   let uid = `${user.uid}`
   await api.child(`user/${uid}`).set({phone:phone})
   console.log('createUser:',phone)
   return user
}

userMgr.login=async (phone,password)=>{ 
  return wilddog.auth().signInWithPhoneAndPassword(phone,password)
}

userMgr.loginByEmail=async (email, password)=>{ 
  return wilddog.auth().signInWithEmailAndPassword(email, password)
}

userMgr.updateEmail=async (email)=>{ 
   let user = wilddog.auth().currentUser
   await user.updateEmail(email)
   let uid = `${user.uid}`
   await api.child(`user/${uid}`).update({email:email})
   return user
}
userMgr.updatePhone=async (phone)=>{ 
  let user =  wilddog.auth().currentUser
  await user.updatePhone(phone)
  let uid = `${user.uid}`
  await api.child(`user/${uid}`).update({phone:phone})
  return user
}
userMgr.updateProfile=async (displayName,photoUrl)=>{ 
  let profile={
      'displayName': displayName,
      'photoURL': photoUrl
   }
   let user =  wilddog.auth().currentUser
   let uid = `${user.uid}`
   await api.child(`user/${uid}`).update(profile)
   await user.updateProfile(profile)

   return user
}



export default userMgr