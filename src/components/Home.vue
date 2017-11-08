<template>
  <div id="home" class="home">
    <!--大图-->
    <div class="wx-banner">
      <div>
        <span v-html="user.user"></span><span class="logout" @click="logout" v-if="!isLogouting">【注销】</span>
      </div>
    </div>
    <!--选择工地-->
    <div class="wx-worksite">
      <img src="../images/wx-addr.png" alt="" >
      <span>当前工地:</span><span class="wx-site" v-html="worksite.worksite?worksite.worksite:''"></span>
      <input type="button" v-on:click="workSite" value="选择工地">
    </div>
    <!--设备列表-->
    <div>
      <div v-for="item in items" class="wx-sb"  @click="ddj()">
        <div><img src="../images/wx-sb.png" alt=""></div>
        <div>
          <span>设备名称:</span>
          <span v-html="item.assetName"></span>
          <span>设备编号:</span>
          <span v-html="item.assetCode"></span>
        </div>
      </div>
    </div>
    <!--底部待登记未登记数-->
    <div>
      <ul>
        <li>
          <a @click="ddj()">

            <div class="wx-outer-ddj wx-outer">
              <div class="wx-inner-ddj wx-inner">
                <span v-html="count.ddj"></span><span>/个</span>
              </div>
            </div>
            <p class="ddj">待登记设备</p>
          </a>
        </li>
        <li>
          <a @click="ydj()">

            <div class="wx-outer-ydj wx-outer">
              <div class="wx-inner-ydj wx-inner">
                <span v-html="count.ydj"></span><span>/个</span>
              </div>
            </div>

            <p class="ydj">已登记设备</p>
          </a>
        </li>
      </ul>
    </div>

    <Loading v-if="isLogouting" marginTop="3%"></Loading>
    <v-scan @click="scanClick()"></v-scan>
  </div>
</template>

<script>
  import Scan from './scan.vue';
  import Loading from './Loading.vue'
  export default {
    name: 'Home',
    data () {
      return {
          isLogouting: false,
          items: [],
          user:[],
          worksite:[],
          count:[]
       }
    },
    components:{
      'v-scan': Scan,
      Loading
    },
    created (){
      // 获取设备列表、传入工地id
      this.$http.get('/static/deviceList1.json',{
          params: {
            productType:"1",
            pageNum:1,
            pageLimit:8,
            wosiId:111
          }
        })
        .then(
          function(response){
            this.items =response.data.data.result;
          },
          function(response){

          }
        )
        // 获取当前登录人信息
        this.$http.get('/static/user.json',{
            params: {
              productType:"1",
              pageNum:1,
              pageLimit:8
            }
          })
          .then(
            function(response){
              this.user =response.data.data;

              console.log(this.user);
            },
            function(response){
              console.log(response);
            }
          )
          // 获取当前工地信息
          this.$http.get('/static/worksite.json',{
              params: {
                productType:"1",
                pageNum:1,
                pageLimit:8
              }
            })
            .then(
              function(response){
                this.worksite =response.data.data;
              },
              function(response){
                console.log(response);
              }
            )
            // 获取当前工地下待登记数和已登记数
            this.$http.get('/static/count.json',{
                params: {
                  productType:"1",
                  pageNum:1,
                  pageLimit:8
                }
              })
              .then(
                function(response){
                  this.count =response.data.data;
                  console.log(this.count)
                },
                function(response){
                  console.log(response);
                }
              )
    },
    methods: {
      ydj: function(e) {
        this.$router.push({
          name: 'DeviceList',
          params:{id:e}
        })
      },
      ddj: function(e) {
        this.$router.push({
          name: 'UnregisteredDevice',
          params:{id:e}
        })
      },
      workSite:function(e)
      {
        this.$router.push({
          name: 'RosterSelectSite',
          params:{id:e}
        })
      },
      logout:function()
      {
        //删除cookie并跳到登录页
            this.isLogouting = true;
            this.delCookie('session');
            //演示
            setTimeout(()=>{
              this.$router.push('/');
              this.isLogouting = false;
            },3000)
      }
    }
  }
  // 2016.8——2017.8
  // 参与联通智慧工地、劳务实名制管理系统、营销支撑平台微信公众号、微信小程序业务功能讨论、前端原型页面
  // 设计、前端技术规则制定、以及与其他前端工程师共同完成前端页面、功能实现。
  // 联通智慧工地页面、接口联调、功能实现等。
  // 2014.7——2016.7
  // 负责网络孔子学院，在线课堂、微课堂等前端页面功能实现
  // 2013.11——2015.6
  //
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../css/home.css";
</style>
