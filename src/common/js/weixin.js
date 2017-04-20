// import api from '../../api/login/login.js'
// import { setStore , getStore } from './test.js'

// // import { setStore ,getStore} from '../api/index.js'
// const _DEV_ = {
//   app_id: 'wxc1cc230b1d7f9026',
//   app_secret: 'c014eb02a8378f40a00ee153f5fe6322'
// }
// const _BUILD_ = {
//   app_id: 'wxdecb4631b3faa4ab',
//   app_secret: '9ddcb858a3dd530e77850b42a30a626e'
// }

// const weChat =  process.env.NODE_ENV !== 'production'
//   ? _DEV_
//   : _BUILD_
//  // var  snsUserInfo = (url) => {
//  //    url = encodeURI(window.location.href)
//  //    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc1cc230b1d7f9026&redirect_uri=http://ceo-doc.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
//  //  }
// var urls = encodeURI(window.location.href);
// if(urls.indexOf("#") >= 0){
//      urls=urls.split("#")[0]
// }
// var configdata ={"url":urls};
// api.weChatconfig(configdata).then(function(json){
//    wx.config({
//       debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//       appId:json.data.data.appId, 
//       timestamp: json.data.data.timestamp, // 必填，生成签名的时间戳
//       nonceStr: json.data.data.nonceStr, // 必填，生成签名的随机串
//       signature: json.data.data.signature, // 必填，签名，见附录1
//       jsApiList: [
//         'getLocation',
//         'onMenuShareAppMessage',
//         'onMenuShareTimeline',
//         'onMenuShareQQ',
//         'chooseImage',
//         'uploadImage'

//       ]
//     })
//      wx.ready(() => {
//           // resolve(true)
//         })
//         wx.error((error) => {
              
//         }) 

// })
// //获取地理位置
// export const GPSlocation  = () => {
//    alert("aaaaaaaaaa")
//      wx.getLocation({
//     type: 'wgs84', 
//     success: function (res) {
//         api.GPSloding('?latitude='+res.latitude+'&longitude='+res.longitude).then(function(json){
//               setStore("locationid" , json.data.data.id)
//               setStore("locationcity" , json.data.data.city)
//         })
//         }
//        });
// }

// //分享

// export const shareall = () => {
//    let url = location.href.split('#')[0];
//   let defaultConfig = {
//     title: 'ceo',
//     desc: '我的ceo我的个人医疗管家',
//     link: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf565864b6a1a358d&redirect_uri=http%3a%2f%2fpeifei.qmant.com%2fnoa%2ftoken%3fpage%3dhttp%3a%2f%2fpeifei.qmant.com/index&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect',
//     imgUrl: 'http://o9s1f7266.bkt.clouddn.com/ant_logo.png',
//     success: function () {
//          // 用户确认分享后执行的回调函数
//     },
//     cancel: function () { 
//        // 用户取消分享后执行的回调函数
//     }
//   }

//   //分享给朋友
//   wx.onMenuShareAppMessage(defaultConfig)
//   //分享到朋友圈
//   wx.onMenuShareTimeline(defaultConfig)
//   //分享到QQ
//   wx.onMenuShareQQ(defaultConfig)
//   //分享到腾讯微博
//   // wx.onMenuShareWeibo(defaultConfig)
//    //分享到QQ空间
//   // wx.onMenuShareQZone(defaultConfig)
// }


// //拍照或从手机相册中选图上传图片

// export const choseImage = () => {
//   wx.chooseImage({
//     count: 1, // 默认9
//     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
//     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
//     success: function (res) {
//         var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
//       wx.uploadImage({
//       localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
//       isShowProgressTips: 1, // 默认为1，显示进度提示
//       success: function (res) {
//          var serverId = res.serverId; // 返回图片的服务器端ID
//         }
//       });
//     }
//  });
// }



