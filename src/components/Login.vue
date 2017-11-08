<template>
<div id="login" class="login">
  <div>
    <div>
      <div class="wx_login_log">
        <img :class="'banimg'"  src="../images/wx_login_log.png">
      </div>
      <p>联通智慧工地营销支撑平台</p>
    </div>
    <div>
      <form id="form">
        <tr>
          <div class="wx-user"> <img src="../images/wx_login_user.png" alt=""></div>
          <input type="text"  v-model="account" placeholder="邮箱/手机号">
        </tr>
        <tr>
          <div class="wx-psd"> <img src="../images/wx_login_psd.png" alt=""></div>
          <input type="password"  v-model="password" placeholder="密码6-20位">
        </tr>
        <!-- <a href="javascript:;" class="weui-btn weui-btn_primary">按钮</a> -->
        <tr :class="'borNone'">
          <input type="button" value="登录" :class="'fignIn'" @click="login">
        </tr>
        <!--<router-link class="set-server" to="/Home">服务器配置</router-link>-->
      </form>
      <div class="wx_login_bgd">
        <img :class="'banimg'"  src="../images/wx_login_bgd.png">
      </div>
    </div>



  </div>
    <Loading v-if="isLoging" marginTop="-30%"></Loading>
</div>
</template>

<script>
import Loading from './Loading.vue'
// var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
// var passWord = /^(\w){6,20}$/
export default {
  name: 'login',
  data() {
    return {

        isLoging: false,
        password:"",
        account:""
    }
  },
  components:{
  Loading
  },
  // created() {
  //   this.checkLogin();
  // },
  // computed property for form validation state
  // computed: {
  //   validation: function() {
  //     return {
  //       name: !!this.newUser.name.trim(),
  //       password: passWord.test(this.newUser.password),
  //       email: emailRE.test(this.newUser.email)
  //     }
  //   },
  //   isValid: function() {
  //     var validation = this.validation
  //     return Object.keys(validation).every(function(key) {
  //       return validation[key]
  //     })
  //   }
  //
  // },

  // methods
  // created() {
  //   this.checkLogin();
  // },
  methods: {
    // checkLogin(){
    //       //检查是否存在session
    //       //cookie操作方法在源码里有或者参考网上的即可
    //       if(!this.getCookie('session')){
    //         //如果没有登录状态则跳转到登录页
    //         this.$router.push('/');
    //       }else{
    //         //否则跳转到登录后的页面
    //         this.$router.push('/home');
    //       }
    //     },
        login(){
    		if(this.account!='' && this.password!=''){
    			this.toLogin();
    		}
  	   },
    //登录请求
    toLogin(){

    //一般要跟后端了解密码的加密规则
    //这里例子用的哈希算法来自./js/sha1.min.js
    // let password_sha = hex_sha1(hex_sha1( this.password ));

    //需要想后端发送的登录参数
    let loginParam = {
      account: this.account,
      password:this.password
      // password_sha
    }

    //设置在登录状态
    this.isLoging = true;

    //请求后端,比如:
    /*this.$http.post( 'example.com/login.php', {
    param: loginParam).then((response) => {
      if(response.data.code == 1){
        let expireDays = 1000 * 60 * 60 * 24 * 15;
        this.setCookie('session', response.data.session, expireDays);
        //登录成功后
        this.$router.push('/user_info');
      }
    }, (response) => {
        //Error
    });
    */

    //演示用
    setTimeout(()=>{
      //登录状态15天后过期
      let expireDays = 1000 * 60 * 60 * 24 * 15;
      this.setCookie('session','blablablablabla...', expireDays);
      this.isLoging = false;
      //登录成功后
      this.$router.push('/home/');
    },3000)
  }
    // addUser: function() {
    //   if (this.isValid) {
    //     this.newUser.name = ''
    //     this.newUser.password = ''
    //     this.newUser.email = ''
    //   }
    // },
    // removeUser: function(user) {
    //   usersRef.child(user['.key']).remove()
    // }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../css/login.css";
</style>
