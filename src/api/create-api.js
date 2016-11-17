import wilddog from 'wilddog'
//import {createCache} from '../util'
import LRU from 'lru-cache'

const config = {
  authDomain: "books.wilddog.com",
  syncURL: "https://books.wilddogio.com/v2" 
}
wilddog.initializeApp(config);
const api = wilddog.sync().ref()

api.cachedItems = LRU({
  max: 1000,
  maxAge: 1000 * 60 * 15 // 15 min cache
})

//api.cachedItems = createCache("LRU", 100 * 100 * 10);
/*
api.child(`item`).on('child_added', snapshot => {
     let rec = snapshot.val()
     console.log(rec)
})*/
//let ds=[]
api.cachedIds = {}


api._tops=[]
api.child('item').orderByChild("score").on("child_added",function(snapshot){
  let item=snapshot.val()
  
  if (item.type==='book'){
       console.log(snapshot.key() + " score: " + item.score )
       api._tops.unshift(snapshot.key())
  }
// console.log(ds[0] )
})


  ;['top', 'new'].forEach(type => {
    api.child(`${type}-books`).on('value', snapshot => {
      api.cachedIds[type] = snapshot.val()
    })
  })

export default api