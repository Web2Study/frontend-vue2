import test from 'ava'

test('foo', t => {
    t.pass()
})

test('bar', async t => {
    const bar = Promise.resolve('bar')

    t.is(await bar, 'bar')
})
test('find', t => {
  let ds=[1,2,3]
  let f=ds.find(n=>n==3)
  t.is(f,3)
  f=ds.find(n=>n==9)
 // console.log(f)
  t.is(f,undefined)
})
test(t => {
    t.deepEqual([1, 2], [1, 2])
})