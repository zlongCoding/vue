webpackJsonp([35],{10:function(e,t,n){"use strict";var i=n(126),a=n.n(i),o=n(61),c=n.n(o),r=n(130),u=n.n(r),s=n(36),l=n.n(s),d=this,f=navigator.userAgent,p={version:.01,isIOS:!!f.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),isAndroid:f.indexOf("Android")>-1||f.indexOf("Adr")>-1,isiPhone:f.indexOf("iPhone")>-1,isWeChat:function(){return/micromessenger/i.test(navigator.userAgent)},isMobile:function(e){return/^1(3|4|5|7|8)[0-9]\d{8}$/.test(e)},isCar:function(e){return/(^(浙|闽|粤|京|津|冀|晋|蒙|辽|吉|黑|沪|苏|皖|赣|鲁|豫|鄂|湘|桂|琼|渝|川|贵|云|藏|陕|甘|青|宁|新){1}[A-Z0-9]{6,7}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(e)},isID:function(e){if("string"!=typeof e)return!1;var t,n={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"},i=e.substr(6,4)+"/"+Number(e.substr(10,2))+"/"+Number(e.substr(12,2)),a=new Date(i),o=a.getFullYear()+"/"+Number(a.getMonth()+1)+"/"+Number(a.getDate()),c=(new Date).getTime(),r=a.getTime(),u=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],s=["1","0","X","9","8","7","6","5","4","3","2"],l=0;if(!/^\d{17}(\d|x)$/i.test(e))return!1;if(void 0===n[e.substr(0,2)])return!1;if(r>=c||i!==o)return!1;for(t=0;t<17;t++)l+=e.substr(t,1)*u[t];return s[l%11]===e.substr(17,1)},isPassport:function(e){return/^[a-zA-Z0-9]{7,18}$/.test(e)},isBankCard:function(e){return/^\d{16}|\d{19}$/.test(e)},isEmail:function(e){return/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(e)},isCarLicense:function(e){return/(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6,7}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(e)},fullTwo:function(e){return e>9?e:"0"+e},ele:function(e,t){return t?document.querySelectorAll(e):document.querySelector(e)},setDocTitle:function(e,t){document.title=e,window._paq.push(["setDocumentTitle",e]);var n=function(e,t){p.timer({time:10,speed:100},t)};if(p.isWeChat()){var i=document.createElement("iframe");i.src="/favicon.ico",i.style.visibility="hidden",i.style.width="1px",i.style.height="1px",i.onload=function(){setTimeout(function(){document.body.removeChild(i)},0)},document.body.appendChild(i)}else t=!!t||("智慧车险"===e||"服务授权"===e),p.isiPhone?n(0,function(n){"undefined"!=typeof setInsuranceTitle&&(setInsuranceTitle(e,t),n.clear())}):p.isAndroid&&n(0,function(n){"undefined"!=typeof xfghujergh&&void 0!==xfghujergh.setInsuranceTitle&&(xfghujergh.setInsuranceTitle(e,t),n.clear())})},post:function(e,t){return new l.a(function(n,i){fetch(e,{method:"POST",headers:{"Content-Type":"application/json;charset=UTF-8"},credentials:"same-origin",body:u()(c()({},t))}).then(function(e){window.Mint.Indicator.close(),200===e.status?e.json().then(function(e){100==+e.status?e.warningMessage?(window.Mint.Toast(e.warningMessage[0].message),window.Mint.Indicator&&window.Mint.Indicator.close(),i&&i(e)):n&&n(e.result):(window.Mint.Toast(e.errorMessges[0].message),window.Mint.Indicator&&window.Mint.Indicator.close(),i&&i(e.result))}):window.Mint.Toast(e.status+"错误, "+e.statusText)}).catch(function(e){e&&e.message.indexOf("Failed to fetch")>-1&&window.Mint.Toast("亲～网络中断啦，请重试")})})},get:function(e){return fetch(e,{method:"GET",headers:{Accept:"text/html"},credentials:"same-origin"}).then(function(e){return e.text()}).then(function(e){return e})},objToSlot:function(e){var t=[];for(var n in e)t.push({value:n,key:e[n]});return t},numberToChinese:function(e,t){return t?e?e/1e4>=1?e/1e4+"万":e:"":e?e/1e4>=1?(e/1e4).toFixed(2)+"万":e.toFixed(2):""},arrayNumberToSlot:function(e,t,n){var i=[],o=!0,c=!1,r=void 0;try{for(var u,s=a()(e);!(o=(u=s.next()).done);o=!0){var l=u.value;i.push({value:l,key:""+t(Number(l),n)})}}catch(e){c=!0,r=e}finally{try{!o&&s.return&&s.return()}finally{if(c)throw r}}return i},dateformat:function(e,t){if(e){var n={"M+":e.getMonth()+1,"d+":e.getDate(),"H+":e.getHours(),"m+":e.getMinutes(),"s+":e.getSeconds(),"q+":Math.floor((e.getMonth()+3)/3),S:e.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(e.getFullYear()+"").substr(4-RegExp.$1.length)));for(var i in n)new RegExp("("+i+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?n[i]:("00"+n[i]).substr((""+n[i]).length)));return t}},timer:function(e,t){if(e&&"number"==typeof e.time){var n={time:void 0,speed:void 0,count:void 0,gap:void 0},i=c()(n,e),a=i.time,o=i.speed||1e3,r=i.count>=0?i.count:Math.floor(1e3*a/o),u=i.gap||1,s=void 0,l=d;l.data=i,l.clear=function(){clearTimeout(s)},0===r?l.clear():(i.count=r-=u,s=setTimeout(function(){p.timer(i,t)},o),t&&"function"==typeof t&&t(l))}},onliePay:function(e){e&&(p.isiPhone?"undefined"!=typeof createInsuranceOrderToPay&&createInsuranceOrderToPay(e):p.isAndroid&&"undefined"!=typeof xfghujergh&&void 0!==xfghujergh.createInsuranceOrderToPay&&xfghujergh.createInsuranceOrderToPay(e))},isNetwork:function(){var e=!0;return p.isiPhone?"undefined"!=typeof isNetWorkConnected&&(e=isNetWorkConnected()):p.isAndroid&&"undefined"!=typeof xfghujergh&&void 0!==xfghujergh.isNetWorkConnected&&(e=xfghujergh.isNetWorkConnected()),e},fullScreen:function(e){if(p.isiPhone){if("undefined"!=typeof setPaySuccessWebViewFullScreen)return setPaySuccessWebViewFullScreen(),!0}else if(p.isAndroid&&"undefined"!=typeof xfghujergh&&void 0!==xfghujergh.setPaySuccessWebViewFullScreen)return xfghujergh.setPaySuccessWebViewFullScreen(),!0},urlCode:function(){return"/"},isShowCode:function(e){if(e){var t="data:image/png;base64,",n=[e.checkCode,e.bizQuestion,e.bizCheckCode,e.ctpQuestion,e.ctpCheckCode],i=n[0],a=n[1],o=n[2],c=n[3],r=n[4];return i?i?t+i:i:!!(a||o||c||r)&&{bizQuestion:a,bizCheckCode:o?t+o:o,ctpQuestion:c,ctpCheckCode:r?t+r:r}}}};t.a=p},121:function(e,t,n){"use strict";var i={certificateType:{ID_CARD:"身份证",PASSPORT:"护照"},company:{picc:"人保财险",cpic:"太保财险",gpic:"国寿财险",paic:"平安财险",cicp:"联合财险",ccic:"大地财险",taic:"天安保险",yaic:"永安财险",ygbx:"阳光财险",abic:"安邦财险",tpic:"太平保险",zkic:"紫金财险",other:"其他"},serverList:{"白金安驾":"server_two","金安驾":"server_two","黑金安驾":"server_one"},detailState:{CALC:"待投保",INSURE:"待核保",TOBEPAID:"待支付",PAID:"待生效",EFFECT:"生效",ENSURING:"保障中",EXPIRE:"已过期",DELETE:"删除"},insureState:{INSURE:"投保",NOINSURE:"不投保"},INSURANCE:{ALL:"交强险+商业险",COMPREHENSIVE:"商业",COMPULSORY:"交强"},deleteButtonShow:{CALC:!0,INSURE:!0,TOBEPAID:!1,PAID:!1,EFFECT:!1,ENSURING:!1,EXPIRE:!0,DELETE:!1},deleteTextShow:{CALC:"删除",TOBEPAID:"取消订单",INSURE:"取消订单",EXPIRE:"删除"},submitTextShow:{CALC:"投保",INSURE:"查看详情",TOBEPAID:"支付",PAID:"查看详情",EFFECT:"查看详情",EXPIRE:"查看详情",ENSURING:"查看详情"},companyPhone:{cpic:"95500",gpic:"95519",ygbx:"95510"},callPhone:{cpic:"tel:95500",gpic:"tel:95519",ygbx:"tel:95510"},insuranceKind:{ALL:"交强险+商业险",COMPREHENSIVE:"商业险",COMPULSORY:"交强险"},serviceStatus:{VALID:"有效",INVALID:"失效",REFUNDED:"已退款"}};t.a=i},173:function(e,t,n){"use strict";var i=n(472),a=n.n(i);t.a=function(e){e.component("navbar",a.a)}},174:function(e,t,n){"use strict";var i=n(121),a=n(10),o=function(e){return e>9?e:"0"+e};t.a=function(e){e.filter("filterDemo",function(e){return e+" -"}),e.filter("config",function(e,t){return e?i.a[t][e]:""}),e.filter("formatTime",function(e,t){if("[object Date]"!==Object.prototype.toString.call(e))return"";var n=new Date(e),i=n.getFullYear(),a=o(n.getMonth()+1),c=o(n.getDate()),r=o(n.getHours()),u=o(n.getMinutes()),s=i+"-"+a+"-"+c,l=r+":"+u;return t?s+" "+l:s}),e.filter("insure",function(e){return e&&"0"===e.isSelect?i.a.insureState.NOINSURE:!e||e.sumInsured&&"null"!==e.sumInsured?a.a.numberToChinese(e.sumInsured,!0):i.a.insureState.INSURE}),e.filter("numberToChinese",function(e){return e/1e4>1?(e/1e4).toFixed(2)+"万":e}),e.filter("doubleNumber",function(e){return"string"==typeof e?(+e).toFixed(2):e}),e.filter("replaceCode",function(e){return e?e.replace(/-/g,"."):"0"}),e.filter("formatMinute",function(e){return e<60?e+"分钟":Math.floor(e/60)+"小时"+e%60+"分钟"})}},175:function(e,t,n){"use strict";var i=n(60),a=n(474);i.default.use(a.a);var o=function(e){return n.e(5).then(function(){var t=[n(485)];e.apply(null,t)}.bind(this)).catch(n.oe)},c=function(e){return n.e(2).then(function(){var t=[n(503)];e.apply(null,t)}.bind(this)).catch(n.oe)},r=function(e){return n.e(7).then(function(){var t=[n(487)];e.apply(null,t)}.bind(this)).catch(n.oe)},u=function(e){return n.e(22).then(function(){var t=[n(486)];e.apply(null,t)}.bind(this)).catch(n.oe)},s=function(e){return n.e(3).then(function(){var t=[n(498)];e.apply(null,t)}.bind(this)).catch(n.oe)},l=function(e){return n.e(25).then(function(){var t=[n(495)];e.apply(null,t)}.bind(this)).catch(n.oe)},d=function(e){return n.e(29).then(function(){var t=[n(501)];e.apply(null,t)}.bind(this)).catch(n.oe)},f=function(e){return n.e(18).then(function(){var t=[n(494)];e.apply(null,t)}.bind(this)).catch(n.oe)},p=function(e){return n.e(24).then(function(){var t=[n(502)];e.apply(null,t)}.bind(this)).catch(n.oe)},h=function(e){return n.e(4).then(function(){var t=[n(497)];e.apply(null,t)}.bind(this)).catch(n.oe)},m=function(e){return n.e(26).then(function(){var t=[n(493)];e.apply(null,t)}.bind(this)).catch(n.oe)},v=function(e){return n.e(13).then(function(){var t=[n(492)];e.apply(null,t)}.bind(this)).catch(n.oe)},_=function(e){return n.e(8).then(function(){var t=[n(491)];e.apply(null,t)}.bind(this)).catch(n.oe)},E=function(e){return n.e(9).then(function(){var t=[n(488)];e.apply(null,t)}.bind(this)).catch(n.oe)},y=function(e){return n.e(23).then(function(){var t=[n(483)];e.apply(null,t)}.bind(this)).catch(n.oe)},g=function(e){return n.e(20).then(function(){var t=[n(504)];e.apply(null,t)}.bind(this)).catch(n.oe)},A=function(e){return n.e(15).then(function(){var t=[n(496)];e.apply(null,t)}.bind(this)).catch(n.oe)},I=function(e){return n.e(28).then(function(){var t=[n(478)];e.apply(null,t)}.bind(this)).catch(n.oe)},C=function(e){return n.e(33).then(function(){var t=[n(480)];e.apply(null,t)}.bind(this)).catch(n.oe)},S=function(e){return n.e(27).then(function(){var t=[n(481)];e.apply(null,t)}.bind(this)).catch(n.oe)},T=function(e){return n.e(1).then(function(){var t=[n(500)];e.apply(null,t)}.bind(this)).catch(n.oe)},D=function(e){return n.e(11).then(function(){var t=[n(507)];e.apply(null,t)}.bind(this)).catch(n.oe)},b=function(e){return n.e(19).then(function(){var t=[n(506)];e.apply(null,t)}.bind(this)).catch(n.oe)},x=function(e){return n.e(10).then(function(){var t=[n(508)];e.apply(null,t)}.bind(this)).catch(n.oe)},O=function(e){return n.e(31).then(function(){var t=[n(489)];e.apply(null,t)}.bind(this)).catch(n.oe)},N=function(e){return n.e(16).then(function(){var t=[n(482)];e.apply(null,t)}.bind(this)).catch(n.oe)},R=function(e){return n.e(6).then(function(){var t=[n(484)];e.apply(null,t)}.bind(this)).catch(n.oe)},w=function(e){return n.e(0).then(function(){var t=[n(511)];e.apply(null,t)}.bind(this)).catch(n.oe)},L=function(e){return n.e(12).then(function(){var t=[n(490)];e.apply(null,t)}.bind(this)).catch(n.oe)},P=function(e){return n.e(14).then(function(){var t=[n(505)];e.apply(null,t)}.bind(this)).catch(n.oe)},U=function(e){return n.e(17).then(function(){var t=[n(510)];e.apply(null,t)}.bind(this)).catch(n.oe)},M=function(e){return n.e(21).then(function(){var t=[n(499)];e.apply(null,t)}.bind(this)).catch(n.oe)},Q=function(e){return n.e(32).then(function(){var t=[n(479)];e.apply(null,t)}.bind(this)).catch(n.oe)},k=function(e){return n.e(30).then(function(){var t=[n(509)];e.apply(null,t)}.bind(this)).catch(n.oe)};t.a=new a.a({base:"/banma/",mode:"history",scrollBehavior:function(e,t,n){return n||{x:0,y:0}},routes:[{path:"/",component:o},{path:"/home",name:"home",component:o},{path:"/reserve",name:"reserve",component:c},{path:"/insurance/list",name:"insuranceList",component:r},{path:"/insurance/detail",name:"insuranceDetail",component:u},{path:"/policy",name:"policy",component:s},{path:"/policySucceed",name:"policySucceed",component:M},{path:"/plan",name:"Plan",component:l},{path:"/plan/edit",name:"PlanEdit",component:f},{path:"/quoted",name:"Quoted",component:p},{path:"/confirm",name:"Confirm",component:h},{path:"/process",name:"Process",component:d},{path:"/phonelist",name:"phoneList",component:m},{path:"/phonedetail",name:"phoneDetails",component:v},{path:"/labor",name:"peopleInsurance",component:_},{path:"/fail",name:"insuranceFail",component:E},{path:"/success",name:"buySuccess",component:y},{path:"/selectDealer",name:"selectDealer",component:g},{path:"/selectAddress",name:"selectAddress",component:A},{path:"/access",name:"access",component:I},{path:"/agreement",name:"agreement",component:C},{path:"/activity",name:"activity",component:S},{path:"/prizes",name:"prizes",component:T},{path:"/serviceslist",name:"serviceslist",component:D},{path:"/servicesdetail",name:"servicesdetail",component:b},{path:"/sureorder",name:"sureorder",component:x},{path:"/myservice",name:"myService",component:L},{path:"/servicerefund",name:"serviceRefund",component:P},{path:"/succeedrefund",name:"succeedRefund",component:U},{path:"/giftdetail",name:"giftdetail",component:R},{path:"/businesslist",name:"businesslist",component:N},{path:"/activityinclude",name:"activityinclude",component:Q},{path:"/map",name:"map",component:O},{path:"/useranalysis",name:"useranalysis",component:w},{path:"/userprotocol",name:"userProtocol",component:k}]})},176:function(e,t,n){"use strict";var i=n(60),a=n(181),o=n(231),c=n(200),r=n(216),u=n(211);i.default.use(a.a);var s=new a.a.Store({state:o.a,actions:c.a,mutations:r.a,getters:u.a});window.store=s,t.a=s},194:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(177),a=(n.n(i),n(60)),o=n(176),c=n(175),r=n(174),u=n(173),s=n(10),l=n(116),d=n.n(l),f=n(178),p=n.n(f),h=n(179);n.n(h);a.default.use(d.a),window.Mint=d.a,a.default.config.productionTip=!1,p.a.attach(document.body),n.i(r.a)(a.default),n.i(u.a)(a.default);var m=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"0.2s";s.a.ele("#processBar").style.width=e+"%",s.a.ele("#processBar").style.transition=t},v=null;c.a.beforeEach(function(e,t,n){if(s.a.isNetwork()||window.Mint.Toast("亲～没有网络啦，请检查网络～"),"/access"===e.path)n();else if(o.a.state.Home.auth_banma){s.a.ele("body").setAttribute("page",e.name);var i=10,a=12;clearInterval(v),v=setInterval(function(){a-=1,a=a<0?1:a,i>=90?(clearInterval(v),m(90)):(i+=a,m(i))},100),n()}else o.a.dispatch("HOME_AUTH_BANMA",{vin:e.query.vin,authCode:e.query.authcode}).then(function(e){"SUCCESS"===e?n():n("/access")},function(e){n("/access")}).catch(function(e){e&&console.log(e),n("/access")})}),c.a.afterEach(function(e){clearInterval(v),m(100),setTimeout(function(){return m(0,"0s")},500)}),new a.default({router:c.a,store:o.a}).$mount("#app")},195:function(e,t,n){"use strict";t.a={BUSINESS_MAP:function(e,t){(0,e.commit)("business_map",t)}}},196:function(e,t,n){"use strict";var i=n(10);t.a={CONFIRM_SUBMIT:function(e,t){e.commit,e.state;i.a.post("/auto/policy/submit",t.data).then(function(e){t.callback&&t.callback(e)})},CONFIRM_GETITEM:function(e,t){var n=e.commit;e.state;i.a.post("/auto/policy/detail/"+t.orderNo).then(function(e){n("confirm_getItem",e),t.callback&&t.callback()})},CONFIRM_SELECTADDRESS:function(e,t){var n=e.commit;e.state;i.a.post("/auto/policy/delivery/"+t.orderNo).then(function(e){n("confirm_address",e),e.delivery&&e.delivery.length>0&&(e.delivery[0].back=!0,n("selectAddress_info",e.delivery[0])),n("selectAddress_req",{name:e.name,mobile:e.mobile,province:e.province,city:e.city,detailAddress:""}),t.callback&&t.callback()})}}},197:function(e,t,n){"use strict";var i=n(36),a=n.n(i),o=n(10);t.a={DETAIL_GETINFO:function(e,t){e.commit;return new a.a(function(e,n){o.a.post("/auto/policy/detail/"+t.orderNo).then(function(t){e(t)}).catch(function(e){n(e)})})}}},198:function(e,t,n){"use strict";var i=n(10);t.a={EDIT_GETPOLICY:function(e,t){var n=e.commit,a=(e.state,t.orderNo),o=t.province,c={};c=a?{orderNo:a,province:o}:{province:o},i.a.post("/auto/policy/coverage",c).then(function(e){n("edit_getprolicy",e),t.callback&&t.callback()})},EDIT_UPDATEMODULE:function(e,t){var n=e.commit;e.state;n("edit_updateModule",t)},EDIT_ToogleTip:function(e,t){var n=e.commit;e.state;n("edit_toogleTip",t)},EDIT_SetTCI:function(e,t){var n=e.commit;e.state;n("edit_setTCI",t)}}},199:function(e,t,n){"use strict";var i=n(36),a=n.n(i),o=n(10);t.a={HOME_UPDATE_VIN:function(e,t){var n=e.commit;e.state;t&&n("home_update_vin",t)},HOME_UPDATE_AUTHCODE:function(e,t){var n=e.commit;e.state;t&&n("home_update_authCode",t)},HOME_UPDATE_PAYCONFIG:function(e,t){var n=e.commit;e.state;n("home_update_payConfig",t)},HOME_AUTH_BANMA:function(e,t){var n=e.commit;e.state;return n("home_update_vin",t.vin),n("home_update_authCode",t.authCode),new a.a(function(e,i){o.a.post("/auth/banma",t).then(function(t){n("home_auth_banma",t),e(t)},function(t){n("home_auth_banma",t),e(t)}).catch(function(e){i(e)})})}}},200:function(e,t,n){"use strict";var i=n(61),a=n.n(i),o=n(199),c=n(201),r=n(197),u=n(208),s=n(206),l=n(202),d=n(196),f=n(198),p=n(205),h=n(204),m=n(207),v=n(209),_=n(203),E=n(195),y=n(210);t.a=a()({},o.a,c.a,r.a,u.a,s.a,l.a,d.a,f.a,p.a,h.a,m.a,v.a,_.a,E.a,y.a)},201:function(e,t,n){"use strict";var i=n(36),a=n.n(i),o=n(10);t.a={INSURANCE_TOGGLE:function(e,t){var n=e.commit;e.state;n("insurance_toggle",t)},INSURANCE_UPDATE_REQ:function(e,t){var n=e.commit;e.state;n("insurance_update_req",t)},INSURANCE_GET_DEALER_LIST:function(e,t){var n=e.commit;e.state;o.a.post("/partner/auto/dealer",{city:t.city,province:t.province}).then(function(e){n("insurance_update_dealer_list",e)})},INSURANCE_GETAREA:function(e,t){var n=e.commit,i=(e.state,function(e,i){o.a.post("/auto/policy/dealer/"+t.params.vouchersNo).then(function(e){n("insurance_update_dealer_list",e),t.callback&&t.callback()})}),a=function(e){o.a.post("/partner/auto/vehicle-person",t.params.area).then(function(t){n("insurance_update_info",t),i(e[0].province.key,e[0].city[0].key),window.store.dispatch("INSURANCE_UPDATE_CITY_VALUE",{province:e[0].province,city:e[0].city[0]})})},c=t.params.vouchersNo;o.a.post("/auto/policy/area/"+c).then(function(e){var t=[e];n("insurance_update_area",t),a(t)})},POLICY_CALCULATE:function(e,t){var n=e.commit;return new a.a(function(e,i){o.a.post("/auto/policy/calculate",t).then(function(t){n("SET_POLICY_CALCULATE",t),e(t)}).catch(function(e){i(e)})})},INSURANCE_UPDATE_CITY:function(e,t){var n=e.commit;e.state;n("insurance_update_city",t)},INSURANCE_UPDATE_CITY_VALUE:function(e,t){var n=e.commit;e.state;n("insurance_update_city_value",t)},INSURANCE_TOGGLE_DEALER:function(e,t){var n=e.commit;e.state;n("insurance_toggle_dealer",t)}}},202:function(e,t,n){"use strict";var i=n(36),a=n.n(i),o=n(10);t.a={LIST_INITORDERLIST:function(e,t){e.commit;return new a.a(function(e,n){o.a.post("/auto/policy/query",t).then(function(t){e(t)}).catch(function(e){n(e)})})},LIST_DELETEITEM:function(e,t){e.commit;return new a.a(function(e,n){o.a.post("/auto/policy/delete/"+t.item.orderNo).then(function(t){e(t)}).catch(function(e){n(e)})})}}},203:function(e,t,n){"use strict";var i=n(10);t.a={MYSERVICE_VOUCHERSLIST:function(e,t){var n=e.commit;e.state;i.a.post("/order/vouchersList",t).then(function(e){n("myservice_voucherslist",e),t.callback&&t.callback()})}}},204:function(e,t,n){"use strict";t.a={PHONELIST_CONFIG:function(e,t){var n=e.commit;e.state;n("phoneList_config",t)}}},205:function(e,t,n){"use strict";t.a={PROCESS_SUBMIT:function(e,t){e.commit,e.state}}},206:function(e,t,n){"use strict";var i=n(61),a=n.n(i),o=n(10);t.a={QUOTED_GET_CALCULATE:function(e,t){var n=e.commit,i=e.state,c=i.Insurance.Req,r={dealerAgreement:{insurer:t.insurer},dealerCode:c.dealerCode,owner:{certificateNo:c.certificateNo,certificateType:c.certificateType,mobile:c.ownerMobile,name:c.ownerName},vehicle:{engineNo:c.engineNo,licenseNo:c.licenseNo,modelName:c.modelName,registerDate:o.a.dateformat(c.registerDate,"yyyy-MM-dd"),vin:c.vin}};i.Edit.policylist&&a()(r,{coverages:i.Edit.policylist}),t.isSelectedCTP&&a()(r,{isSelectedCTP:t.isSelectedCTP}),r.dealerCode&&(n("quoted_start_loading",{item:t.insurer,code:1}),o.a.post("/auto/policy/calculate",r).then(function(e){n("quoted_set_calculate",e),n("quoted_load_done"),i.Quoted.Options.calculateDone===i.Quoted.Data.insurance.recommended.length&&window.store.dispatch("QUOTED_LOAD_UNRECOMOND")},function(e){n("quoted_start_loading",{item:t.insurer,code:3}),n("quoted_load_done"),i.Quoted.Options.calculateDone===i.Quoted.Data.insurance.recommended.length&&window.store.dispatch("QUOTED_LOAD_UNRECOMOND")}))},QUOTED_LOAD_UNRECOMOND:function(e){var t=(e.commit,e.state);t.Quoted.Data.insurance.nonRecommended.forEach(function(e){window.store.dispatch("QUOTED_GET_CALCULATE",{insurer:e,isSelectedCTP:!0===t.Edit.isSelectedCTP?"1":"0"})})},QUOTED_GET_INSURANCE:function(e,t){var n=e.commit,i=e.state;t.from&&t.from.name,o.a.post("/partner/auto/insurance/"+t.province+"/"+t.dealerCode+"/"+t.vin).then(function(e){n("quoted_update_insurance",e),i.Quoted.Data.insurance.recommended&&i.Quoted.Data.insurance.recommended.length>0?(n("quoted_toggle_detail",i.Quoted.Data.insurance.recommended[0]),n("quoted_init"),i.Quoted.Data.insurance.recommended.forEach(function(e){window.store.dispatch("QUOTED_GET_CALCULATE",{insurer:e,isSelectedCTP:!0===i.Edit.isSelectedCTP?"1":"0"})})):i.Quoted.Data.insurance.nonRecommended&&i.Quoted.Data.insurance.nonRecommended.length>0&&(n("quoted_toggle_detail",i.Quoted.Data.insurance.nonRecommended[0]),n("quoted_init"),window.store.dispatch("QUOTED_LOAD_UNRECOMOND"))})},INSURANCE_TOGGLE_DETAIL:function(e,t){var n=e.commit;e.state;n("quoted_toggle_detail",t)}}},207:function(e,t,n){"use strict";var i=n(36),a=n.n(i),o=n(10);t.a={RESERVE_PREMIUM_RECORD:function(e,t){e.commit;return new a.a(function(e,n){o.a.post("/ubi/premium-record",t).then(function(t){e(t)}).catch(function(e){n(e)})})},RESERVE_GET_BALANCE:function(e,t){e.dispatch;return new a.a(function(e,n){o.a.post("/ubi/balance",t).then(function(t){e(t)}).catch(function(e){n(e)})})}}},208:function(e,t,n){"use strict";var i=n(10);t.a={SELECTADDRESS_UPDATED:function(e,t){var n=e.commit;e.state;n("selectAddress_info",t)},SELECTADDRESS_MOREN:function(e,t){var n=e.commit;e.state;n("selectAddress_req",t)},SELECTADDRESS_BACK:function(e,t){var n=e.commit;e.state;n("selectAddress_back",t)},SELECTADDRESS_GETAREA:function(e,t){var n=e.commit;e.state;i.a.post("/partner/auto/area").then(function(e){n("selectAddress_area",e),t.callback()})},SELECTADDRESS_SELECTCITY:function(e,t){var n=e.commit;e.state;n("selectAddress_selectcCity",t)},SELECTADDRESS_UPDATEINDEX:function(e,t){var n=e.commit;e.state;n("selectAddress_updateIndex",t)}}},209:function(e,t,n){"use strict";t.a={SERVICE_COMPANY:function(e,t){var n=e.commit;e.state;n("services_company",t)},SERVICE_DETAIL:function(e,t){var n=e.commit;e.state;n("services_detail",t)},SERVICE_HASBOUGHT:function(e,t){var n=e.commit;e.state;n("services_hasbought",t)},SERVICE_BUYAREA:function(e,t){var n=e.commit;e.state;n("services_buyarea",t)},SERVICE_VOUCHERSNO:function(e,t){var n=e.commit;e.state;n("services_vouchersno",t)},SERVICE_MAPLIST:function(e,t){var n=e.commit;e.state;n("services_maplist",t)}}},210:function(e,t,n){"use strict";var i=n(36),a=n.n(i),o=n(10);t.a={USERANALYSISI_TRIPLABE:function(e,t){var n=e.commit,i=t;return new a.a(function(e,t){o.a.post("/ubi/trip-label/"+i).then(function(t){n("useranalysis_gettriplabel",t),e(t)}).catch(function(e){t(e)})})}}},211:function(e,t,n){"use strict";var i={vin:function(e){return e.Home.Data.vin},authCode:function(e){return e.Home.Data.authCode},orderNo:function(e){return e.List.orderNo},vouchersNo:function(e){return e.myService.vouchersNo}};t.a=i},212:function(e,t,n){"use strict";t.a={business_map:function(e,t){e.businessList.address=t}}},213:function(e,t,n){"use strict";t.a={confirm_address:function(e,t){e.Confirm.address=t},confirm_getItem:function(e,t){e.Confirm.order=t}}},214:function(e,t,n){"use strict";var i=n(130),a=n.n(i),o=n(126),c=n.n(o),r=n(10);t.a={edit_getprolicy:function(e,t){e.Edit.isSelectedCTP=!0,e.Edit.policylist=t,e.Edit.oripolicylist=[];var n=!0,i=!1,o=void 0;try{for(var u,s=c()(t);!(n=(u=s.next()).done);n=!0){var l=u.value;e.Edit.oripolicylist.push(JSON.parse(a()(l)))}}catch(e){i=!0,o=e}finally{try{!n&&s.return&&s.return()}finally{if(i)throw o}}var d=[{key:"投保",value:"1"},{key:"不投保",value:"0"}],f=[{key:"不投保",value:"0"}];for(var p in t){var h=[];t[p].options.length>0&&(h=r.a.arrayNumberToSlot(t[p].options,r.a.numberToChinese,!0)),h.length>0?e.Edit.slots[p][0].values=f.concat(h):e.Edit.slots[p][0].values=d.concat(h)}},edit_updateModule:function(e,t){var n=!e.Edit.policyFlag[t.index];e.Edit.policyFlag.splice(t.index,1,n)},edit_toogleTip:function(e,t){"1"===e.Edit.policylist[t.data].exemptSelected?e.Edit.policylist[t.data].exemptSelected="0":e.Edit.policylist[t.data].exemptSelected="1"},edit_setTCI:function(e,t){"0"===t.data.value?e.Edit.isSelectedCTP=!1:e.Edit.isSelectedCTP=!0}}},215:function(e,t,n){"use strict";t.a={home_update_vin:function(e,t){e.Home.Data.vin=t},home_update_authCode:function(e,t){e.Home.Data.authCode=t},home_update_payConfig:function(e,t){e.Home.payConfig=t},home_auth_banma:function(e,t){e.Home.auth_banma=t}}},216:function(e,t,n){"use strict";var i=n(61),a=n.n(i),o=n(215),c=n(217),r=n(222),u=n(223),s=n(218),l=n(214),d=n(213),f=n(221),p=n(220),h=n(224),m=n(219),v=n(212),_=n(225);t.a=a()({},o.a,c.a,u.a,r.a,s.a,l.a,d.a,f.a,p.a,h.a,m.a,v.a,_.a)},217:function(e,t,n){"use strict";t.a={SET_POLICY_CALCULATE:function(e,t){e.Insurance.calculate=t},insurance_toggle:function(e,t){e.Insurance.Options[t]=!e.Insurance.Options[t]},insurance_update_req:function(e,t){e.Insurance.Req[t.key]=t.value},insurance_update_area:function(e,t){var n=[],i=[];t.forEach(function(e,t){var a=e.province;a.index=t,n.push(a),i.push(e.city)}),i.forEach(function(e){e.map(function(e,t){e.index=t})}),e.Insurance.Options.area[0].values=n,e.Insurance.Options.provinceList=n,e.Insurance.Options.cityList=i},insurance_update_city:function(e,t){e.Insurance.Options.area[2].values=e.Insurance.Options.cityList[t]},insurance_update_info:function(e,t){t.registerDate?t.isRegisterDate=!0:t.isRegisterDate=!1,t.isConfirmRegisterDate=!1,t.registerDate=t.registerDate?t.registerDate:new Date,e.Insurance.Req=t,e.Insurance.Req.certificateType="ID_CARD";var n=t.province;e.Insurance.Options.provinceList.forEach(function(i){if(i.key===n){e.Insurance.Options.province=i;e.Insurance.Options.cityList[i.index].forEach(function(n){n.key===t.city&&(e.Insurance.Options.city=n)})}})},insurance_update_city_value:function(e,t){e.Insurance.Req.city=t.city.key,e.Insurance.Req.province=t.province.key,e.Insurance.Options.city=t.city,e.Insurance.Options.province=t.province},insurance_update_dealer_list:function(e,t){if(!t.length)return e.Insurance.Req.dealerCode="",e.Insurance.Options.dealerList=[],void(e.Insurance.Options.currentDealer={});e.Insurance.Options.dealerList=t,e.Insurance.Options.currentDealer=t[0],e.Insurance.Req.dealerCode=t[0].dealerCode},insurance_toggle_dealer:function(e,t){e.Insurance.Options.currentDealer=t,e.Insurance.Req.dealerCode=t.dealerCode}}},218:function(e,t,n){"use strict";t.a={SET_ORDER_NO:function(e,t){e.List.orderNo=t}}},219:function(e,t,n){"use strict";t.a={myservice_voucherslist:function(e,t){e.myService.voucherslist=t}}},220:function(e,t,n){"use strict";t.a={phoneList_config:function(e,t){e.phoneList.config=t}}},221:function(e,t,n){"use strict";t.a={}},222:function(e,t,n){"use strict";t.a={quoted_update_insurance:function(e,t){e.Quoted.Data.insurance=t;var n=[];n=n.concat(t.recommended,t.nonRecommended),e.Quoted.Options.company=n,n.forEach(function(t){return e.Quoted.Options.loadingStatus[t]=0}),e.Quoted.Options.loaded=!0},quoted_start_loading:function(e,t){e.Quoted.Options.loadingStatus[t.item]=t.code},quoted_init:function(e){e.Quoted.Data.result={},e.Quoted.Options.calculateDone=0},quoted_load_done:function(e,t){e.Quoted.Options.calculateDone+=1,e.Quoted.Options.calculateDone===e.Quoted.Options.company.length&&(e.Quoted.Options.calculateDone=!0)},quoted_set_calculate:function(e,t){t.totalPremium&&0!=+t.totalPremium?(e.Quoted.Options.loadingStatus[t.insurer]=2,e.Quoted.Data.result[t.insurer]=t,e.Quoted.Data.result[t.insurer]&&e.Quoted.Data.result[t.insurer].orderNo&&e.Quoted.Data.orderNos.push(e.Quoted.Data.result[t.insurer].orderNo)):e.Quoted.Options.loadingStatus[t.insurer]=3},quoted_toggle_detail:function(e,t){for(var n in e.Quoted.Options.detailShow)e.Quoted.Options.detailShow.hasOwnProperty(n)&&n!==t&&(e.Quoted.Options.detailShow[n]=!1);e.Quoted.Options.detailShow[t]=!e.Quoted.Options.detailShow[t]}}},223:function(e,t,n){"use strict";t.a={selectAddress_info:function(e,t){e.selectAddress.Options=t},selectAddress_req:function(e,t){e.selectAddress.Req=t},selectAddress_back:function(e,t){e.selectAddress.Options.back=t},selectAddress_area:function(e,t){var n=t.filter(function(t){return t.province.value===e.selectAddress.Req.province}),i=[{flex:1,values:[],textAlign:"center",defaultIndex:1e3}];n[0].city.forEach(function(e){i[0].values.push({key:e.value,value:e.value})}),i[0].defaultIndex=1e3,e.selectAddress.Data.cities=n[0].city,e.selectAddress.Data.citySlots=i},selectAddress_selectcCity:function(e,t){e.selectAddress.Req.city=t.city},selectAddress_updateIndex:function(e,t){e.selectAddress.Data.cities.forEach(function(n,i){n.value===t.city&&(e.selectAddress.Data.citySlots[0].defaultIndex=i)})}}},224:function(e,t,n){"use strict";t.a={services_company:function(e,t){e.services.company=t},services_detail:function(e,t){e.services.detail=t},services_hasbought:function(e,t){e.services.hasBought=t},services_buyarea:function(e,t){e.services.buyArea=t},services_vouchersno:function(e,t){e.services.vouchersNo=t},services_maplist:function(e,t){e.services.mapList=t}}},225:function(e,t,n){"use strict";t.a={useranalysis_gettriplabel:function(e,t){t&&t.tripLabelMO&&(e.useranalysis.Data=t.tripLabelMO)}}},226:function(e,t,n){"use strict";t.a={address:""}},227:function(e,t,n){"use strict";t.a={demoText:"this is demo text",address:[],order:{}}},228:function(e,t,n){"use strict";t.a={demoText:"this is demo text"}},229:function(e,t,n){"use strict";t.a={policylist:[],oripolicylist:[],isSelectedCTP:!0,policyFlag:[!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1,!1],slots:[[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}],[{flex:1,values:[],textAlign:"center",defaultIndex:0}]]}},230:function(e,t,n){"use strict";t.a={Data:{vin:"",authCode:""},payConfig:{},auth_banma:void 0}},231:function(e,t,n){"use strict";var i=n(230),a=n(228),o=n(232),c=n(238),r=n(237),u=n(233),s=n(229),l=n(227),d=n(236),f=n(235),p=n(239),h=n(234),m=n(226),v=n(240),_={Home:i.a,Demo:a.a,Insurance:o.a,selectAddress:c.a,Quoted:r.a,List:u.a,Edit:s.a,Confirm:l.a,Process:d.a,services:p.a,phoneList:f.a,myService:h.a,businessList:m.a,useranalysis:v.a};t.a=_},232:function(e,t,n){"use strict";var i=n(10),a=n(121);t.a={Options:{vin:"",showDemo:!1,showArea:!1,showArgument:!1,showCertificate:!1,startDate:new Date("1988-01-01"),endDate:new Date,area:[{flex:1,values:[],textAlign:"center"},{divider:!0,content:"-"},{flex:1,values:[],textAlign:"center"}],slots:[{flex:1,values:i.a.objToSlot(a.a.certificateType),textAlign:"center"}],province:{},city:{},dealerList:[],currentDealer:null},Data:{argument:"这是协议这是协"},Req:{},calculate:{},isSelectDealer:!1}},233:function(e,t,n){"use strict";t.a={orderNo:void 0}},234:function(e,t,n){"use strict";t.a={voucherslist:{},ecOrderNo:null,productNo:null,vouchersNo:null}},235:function(e,t,n){"use strict";t.a={config:{}}},236:function(e,t,n){"use strict";t.a={demoText:"this is demo text"}},237:function(e,t,n){"use strict";t.a={Data:{insurance:{},result:{},orderNos:[]},Options:{company:[],loaded:!1,calculateDone:0,loadingStatus:{picc:0,cpic:0,gpic:0,paic:0,cicp:0,ccic:0,taic:0,yaic:0,ygbx:0,abic:0,tpic:0,zkic:0,other:0},detailShow:{picc:!1,cpic:!1,gpic:!1,paic:!1,cicp:!1,ccic:!1,taic:!1,yaic:!1,ygbx:!1,abic:!1,tpic:!1,zkic:!1,other:!1}}}},238:function(e,t,n){"use strict";t.a={Req:{name:null,phone:null,detailAddress:null,address:null,back:!1},Options:{name:"",mobile:null,details:null,provinceName:null,cityName:null,townName:null},Data:{citySlots:[],cities:[]}}},239:function(e,t,n){"use strict";t.a={company:{},detail:{},hasBought:null,buyArea:{},vouchersNo:null,mapList:{}}},240:function(e,t,n){"use strict";t.a={Data:{}}},241:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"header",computed:{}}},467:function(e,t){},468:function(e,t){},472:function(e,t,n){n(467),n(468);var i=n(180)(n(241),n(473),"data-v-0884596e",null);e.exports=i.exports},473:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"header"}},[n("div",{attrs:{id:"processBar"}})])}]}}},[194]);