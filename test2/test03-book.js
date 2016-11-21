import API from '../src/api'
import test from 'ava'


test('Add Item', async t => {
  let u = await API.userMgr.login('13640327787', '123456')

  let demo1 = {
    // "descendants": 0,
    // "score": 0,
    // "time": Date.now(),
    "title": "this is book 1",
  }
  let demo2 = {
    "title": "this is book 2",
  }
  let demo3 = {
    "title": "this is comment for book 2",
  }
  let data1 = await API.businessMgr.addItem(demo1)
  t.true(data1.id > 0)

  let data2 = await API.businessMgr.addItem(demo2)
  t.true(data2.id > 0)

  let data3 = await API.businessMgr.addItem(demo3, data2.id)
  t.true(data3.id > 0)

  let data = await API.businessMgr.getMyBooks()
  t.is(data.length, 2)
  API.businessMgr.debug()

})




