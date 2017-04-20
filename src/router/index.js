import Vue from 'vue'
import Router from 'vue-router'
import { getStore ,setStore } from '../common/js/test.js'
import api from "../api/login/login.js"
//路由
import login from './login'
import account from './account'
import connection from './connection'



Vue.use(Router)

//如果引用的路由是一个对象形式的请自行使用 connection
const router = new Router({
  mode: 'hash',
  routes: [
     ...login,
     ...account
  ]
})

// 是否有OPENID若没有则跳到授权
router.beforeEach((to, from, next) => {
  if(getStore("snsUserInfoName") == null || getStore("snsUserInfoName") == ""){
      setStore("snsUserInfoName" ,"aaa")
      window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc1cc230b1d7f9026&redirect_uri=http://mycyio.whiteplanet.com.cn&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
  }else{
      if(window.location.href.indexOf("code") >= 0){


  	      var strs;
          strs= window.location.href.split("?")[1].split("=")[1].split("&")[0];
          setStore("snsUserInfoName",strs)

      api.sendaction(strs).then(function(json){
           setStore("userAll",json.data.data)
           next();
         })
       }else{
         next();
       }
    }
})

export default router
