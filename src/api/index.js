// this is aliased in webpack config based on server/client build
import api from './create-api'
import userMgr from './userMgr'
import wilddog from 'wilddog'


let businessMgr={}

// warm the front page cache every 15 min
function warmCache() {
  fetchItems((api.cachedIds.top || []).slice(0, 30))
  setTimeout(warmCache, 1000 * 60 * 15)
}
businessMgr.fetchItem=(id)=>{
  return fetch(`item/${id}`)
}

businessMgr.fetchItems=(ids)=>{
  return Promise.all(ids.map(id => businessMgr.fetchItem(id)))
}

businessMgr.fetchUser=(id)=> {
  return fetch(`user/${id}`)
}
businessMgr.fetchIdsByType=(type) => {
  return api.cachedIds && api.cachedIds[type]
    ? Promise.resolve(api.cachedIds[type])
    : fetch(`${type}-books`)
}

businessMgr.addItem=async (item,parent=0)=>{
  let id=await fetchNextId()
  item.id = id
  let uid=userMgr.curUser().uid
  let user=await businessMgr.fetchUser(uid)
  item.uid=uid
  item.by=user.displayName
  //item.type||
  item.type=parent>0?'comment':'book'
  if(parent>0) {
    item.parent = parent
  }
  let key=`item/${id}`
  await api.child(key).set(item)
 // api.cachedItems.set(key,item)
  if(parent>0) {
     let p=await businessMgr.fetchItem(parent)
     p.kids=p.kids||[]
     p.kids.unshift(id)
     let pk=`item/${parent}`
     await api.child(pk+'/kids').set(p.kids)
   }


  if ("book"===item.type){
     let data=api.cachedIds['new']||[]
     data.unshift(id)
     await api.child('new-books').set(data)
     api.cachedIds['new']=data
     user.books=user.books||[]
     user.books.unshift(id)
     await api.child(`user/${uid}/books`).set(user.books)
  } else{
     user.comments=user.comments||[]
     user.comments.unshift(id)
     await api.child(`user/${uid}/comments`).set(user.comments)
  }
  //api.cachedItems.set(`user/${uid}`,user)
  return item
}
businessMgr.getMyBooks=async ()=>{
  let user =userMgr.curUser()
  user=await businessMgr.fetchUser(user.uid)
  data=user.books||[]
  let data =await Promise.all(data.map(id => businessMgr.fetchItem(id)))
  return data
}
businessMgr.likeItem=async (itemId)=>{
   let user=await businessMgr.fetchUser(userMgr.curUser().uid)
   let likes=user.likes||[]
   const d = likes.find(p => p === itemId)
   if( !d) {
      let result=await api.child(`item/${itemId}/score`).transaction(currentValue => {
         let id = (currentValue || 0) + 1   // 判断计数器是否为空或者是自增加
         return id
      })
      let score = result.snapshot.val()
      likes.unshift(itemId)
      await api.child(`user/${uid}/likes`).set(likes)
      api.cachedItems.set(`user/${user.uid}`,user)
  }
  //console.log('already like')
}
businessMgr.watchList=(type, cb)=>{
  let first = true
  const ref = api.child(`${type}-books`)
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

 businessMgr.updateTop=()=>{
 let data=api._tops
 //console.log(data)

 let len=data.length
 if (len>30) {
     len=30
      data.slice(0, len)
 }
 api.child('top-books').set(data)
}

businessMgr.debug=()=>{
  let data=api.cachedItems.dump()
  data.forEach(function(element) {
    console.log(element)
  }, this);
  
}
function fetch(child) {
  const cache = api.cachedItems
  if (cache && cache.has(child)) {
    let rt=cache.get(child)
    //console.log('load from cache for:',child,rt)
    return Promise.resolve(rt)
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
export default {businessMgr,userMgr}