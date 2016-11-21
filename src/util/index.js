import Vue from 'vue'
import QN from "qiniu"
import CFG from "../../private/mycfg"


export const find=(data,item)=>{
  data=data||[]
  return data.find(p=>p===item)
}
export const loadDataFromIds = (data,ids,key='id') => {
  data=data||[]
  ids=ids||[]
  return ids.map(id => {
    const item = data.find(p => p[key] === id)
    return Vue.util.extend({}, item)
  })
}
/*

//console.log(CFG.QINIU.bucket)
function uptoken(key) {
  var putPolicy = new QN.rs.PutPolicy()//+":"+key)
  return putPolicy.token();
}

*/

//var qiniu = require("qiniu")
//qiniu.conf.ACCESS_KEY = '8qmCfqkpvjGxHQnHUptAccm0cJsgqYHCO6nmLuZJ';
//qiniu.conf.SECRET_KEY = 'kF1ZmyfHZzw82NHSbBgwS3vN-eqsk0oqF1mCcMU3';
QN.conf.ACCESS_KEY = CFG.QINIU.ACCESS_KEY
QN.conf.SECRET_KEY = CFG.QINIU.SECRET_KEY

function uptoken( ) {
  var putPolicy = new QN.rs.PutPolicy(CFG.QINIU.bucket);//+":"+key
  return putPolicy.token();
}
let token='8qmCfqkpvjGxHQnHUptAccm0cJsgqYHCO6nmLuZJ:CC9jYxxQF_BJvyo4LANViJ4D1Xs=:eyJzY29wZSI6InNoYXJlLWJvb2tzIiwiZGVhZGxpbmUiOjE0Nzk0NjQ0ODJ9'//uptoken()
console.log(QN.conf)
let extra = new QN.io.PutExtra()
export const uploadFile=( key, localFile) => {
    return new Promise((resolve, reject) => {
      QN.io.putFile(token, key, localFile, extra, (err, ret)=> {
        if(!err) 
          resolve(ret.key)
        else 
          // 上传失败， 处理返回代码
          reject(err)
     
     })
  })
}
