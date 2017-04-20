// import vueTap from 'v-tap'
// import { getStore ,setStore } from './common/test.js'
// import axios from './api/axios.js'
// import api from './api/login/login.js'
// import { getStore ,setStore } from './common/js/test.js'
// import axios from './api/axios.js'
	    // var datas = getStore("snsUserInfoName")
     //  api.sendaction(datas).then(function(json){
     //       setStore("userAll",json.data.data)
     //     })
import './utils/config'
import Vue from 'vue'
import FastClick from 'fastclick'
import store from './vuex/store'
import App from './App'
import router from './router'
import './common/css/reset.css'
import infiniteScroll from 'vue-infinite-scroll';
Vue.use(infiniteScroll);




if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
new Vue({
    el: '#app',
    router,
    // axios,
    store,
    render: h => h(App)
})