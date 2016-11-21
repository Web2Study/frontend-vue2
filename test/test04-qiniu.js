import test from 'ava'
import * as util from '../src/util'


async function sleep(timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve();
    }, timeout);
  });
}


test('upload file',  async t => {
    let key = 'dog-4.jpg'
    let filePath =  __dirname+'/../src/assets/' + key
   let rep= await util.uploadFile( key, filePath)
   console.log('upload success : ',rep);

 //  await sleep(3000)
   
})

