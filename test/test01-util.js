import test from 'ava'
import * as util from '../src/util'
test('foo', t => {
    t.pass()
})

test('bar', async t => {
    const bar = Promise.resolve('bar')
    t.is(await bar, 'bar')
    t.pass('OK')
})

test('find item from array', t => {
    let ids=[1,2]
    let f=util.find(ids,9)
    t.is(f,undefined)
    f=util.find(ids,2)
    t.is(f,2)
})

test('find data from ids', t => {
  let ids=[1,2]
  let data =[{id:1,name:'alex'}
            ,{id:2,name:'wms'}
            ,{id:3,name:'lyf'}]
  let ds=util.loadDataFromIds(data,ids,'id')
  t.deepEqual(ds,[{id:1,name:'alex'},{id:2,name:'wms'}])
  ids=[]
  ds=util.loadDataFromIds(data,ids)
  t.deepEqual(ds,[])
  ids=undefined
  ds=util.loadDataFromIds(data,ids)
  t.deepEqual(ds,[])
})
