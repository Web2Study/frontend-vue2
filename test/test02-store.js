import * as api from '../src/store/api'
import test from 'ava'

/*
test('AddUser', async t => {
   await api.createUser('13640327787','123456')
   await api.updateEmail('wms@163.com')
   let user= await  api.updateProfile("grace","http://www.pupha.net/wp-content/uploads/2014/03/Octocat.png")
   console.log(user)
})

*/
test('AddItem', async t => {
      let u=await api.login('13640327787','123456')

    
   let demo={
      "uid": u.uid,
      "by": u.displayName,
      "descendants": 0,
      "score": 0,
      "time": Date.now(),
      "title": "this is test",
      "type": "story"
      }
    let data = await api.addItem(demo)  
    console.log(data)
    t.true(data.id>0)
  
})

test('ILikeItem', async t => {
      let u=await api.login('13640327787','123456')
      await api.likeItem(9)
})


