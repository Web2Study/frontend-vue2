import API from '../src/api'
import test from 'ava'


test('AddUser', async t => {
   await API.userMgr.createUser('13640327787','123456')
   await API.userMgr.updateEmail('lsj1788@163.com')
   let user= await  API.userMgr.updateProfile("grace","http://www.pupha.net/wp-content/uploads/2014/03/Octocat.png")
   console.log(user.uid)
})




