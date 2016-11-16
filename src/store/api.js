// this is aliased in webpack config based on server/client build
import api from './create-api'
import wilddog from 'wilddog'

// warm the front page cache every 15 min
if (api.cachedIds) {
  warmCache()
}

function warmCache() {
  fetchItems((api.cachedIds.top || []).slice(0, 30))
  setTimeout(warmCache, 1000 * 60 * 15)
}
export function updateTop(){
 let data=api._tops
 //console.log(data)

 let len=data.length
 if (len>30) {
     len=30
      data.slice(0, len)
 }
 api.child('topstories').set(data)
}
function fetch(child) {
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    return Promise.resolve(cache.get(child))
  } else {
    return new Promise((resolve, reject) => {
      api.child(child).once('value', snapshot => {
        const val = snapshot.val()
        // mark the timestamp when this item is cached
        if (val) val.__lastUpdated = Date.now()
        cache && cache.set(child, val)
        resolve(val)
      }, reject)
    })
  }
}

export function fetchIdsByType(type) {
  return api.cachedIds && api.cachedIds[type]
    ? Promise.resolve(api.cachedIds[type])
    : fetch(`${type}stories`)
}

export function fetchItem(id) {
  return fetch(`item/${id}`)
}

export function fetchItems(ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function fetchUser(id) {
  return fetch(`user/${id}`)
}
function fetchNextId() {
  return new Promise((resolve, reject) => {
    api.child('maxid').transaction(currentValue => {
      let id = (currentValue || 0) + 1   // 判断计数器是否为空或者是自增加
      return id
    }).then(result => {
      if (result.committed) {
       // console.log('transaction commit success!')
        let id = result.snapshot.val()
       // console.log("New ID: ", id)
        api.child('maxid').set(id)
        resolve(id)
      } else {
        reject("bad next id")
      }
    })
  })
}
export async function createUser(phone,password){
   await wilddog.auth().createUserWithPhoneAndPassword(phone,password)
   let user =  wilddog.auth().currentUser
   let uid = `${user.uid}`
  await api.child(`user/${uid}`).set({phone:phone,likes:[1,2,3]})
  return user
}
export async function login(phone,password) {
 return wilddog.auth().signInWithPhoneAndPassword(phone,password)
}
export async function updateEmail(email){
   let user = await wilddog.auth().currentUser.updateEmail(email)
   let uid = `${user.uid}`
   await api.child(`user/${uid}`).update({email:email})
   return user
}
export async function updatePhone(phone){
  let user = await wilddog.auth().currentUser.updatePhone(phone)
  let uid = `${user.uid}`
  await api.child(`user/${uid}`).update({phone:phone})
  return user
}

export async function likeItem(itemId){
  let user =  wilddog.auth().currentUser
  let uid = `${user.uid}`
  user=await fetchUser(uid)
 // console.log(user)
  let likes=user.likes
  
  const d = likes.find(p => p === itemId)
  //console.log(d)
  if( !likes||!d) {
      let result=await api.child(`item/${itemId}/score`).transaction(currentValue => {
         let id = (currentValue || 0) + 1   // 判断计数器是否为空或者是自增加
         return id
      })
     let score = result.snapshot.val()
    // console.log(score)
     likes.push(itemId)
      await api.child(`user/${uid}/likes`).set(likes)
  }
  console.log('already like')
}
export async function updateProfile(displayName,photoUrl){
  let profile={
     'photoURL': photoUrl,
     'displayName': displayName
   }
   let user =  wilddog.auth().currentUser
   //console.log(user)
   await user.updateProfile(profile)
   let uid = `${user.uid}`
   await api.child(`user/${uid}`).update(profile)
   return user
}


export function loginByEmail(email, password) {
 return wilddog.auth().signInWithEmailAndPassword(email, password)
}
export  function curUser(){
  return  wilddog.auth().currentUser
}
export async function addItem(item){
  let id=await fetchNextId()
  item.id = id
  await api.child(`item/${id}`).set(item)
  api.cachedItems.set(`item/${id}`,item)
  let data=api.cachedIds['new']
  data.unshift(id)
  await api.child('newstories').set(data)
  return item
}
/*
export function addItem(item) {
  return new Promise((resolve, reject) => {
    fetchNextId().then(id => {
      item.id = id
      api.child(`item/${id}`).update( item ).then(() => {
        resolve(item)
      }).catch(function (err) {
        reject(err)
      })

    }).catch(function (err) {
      reject(err)
    })

  })
}*/

export function watchList(type, cb) {
  let first = true
  const ref = api.child(`${type}stories`)
  const handler = snapshot => {
    if (first) {
      first = false
    } else {
      cb(snapshot.val())
    }
  }
  ref.on('value', handler)
  return () => {
    ref.off('value', handler)
  }
}
