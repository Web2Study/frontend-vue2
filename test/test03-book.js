import API from '../src/api'
import test from 'ava'


test('Add Item', async t => {
      let u=await API.userMgr.login('13640327787','123456')
     
   let demo={
      "uid": u.uid,
      "by": u.displayName,
      "descendants": 0,
      "score": 0,
      "time": Date.now(),
      "title": "this is book 1",
      "type": "book"
      }
    let data1 = await API.businessMgr.addItem(demo)  
    console.log(data1)
    t.true(data1.id>0)
    demo.title="this is book 2"
    demo.type=undefined
    let data2 = await API.businessMgr.addItem(demo)  
    console.log(data2)
    t.true(data2.id>0)
    demo.title="this is comment for book 2"
    demo.type=undefined
    let data3 = await API.businessMgr.addItem(demo,data2.id)  
    console.log(data3)
    let data=await API.businessMgr.getMyBooks(u.uid)
    t.is(data.length,2)

  
})




