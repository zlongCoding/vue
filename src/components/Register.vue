<template>
  <div id="Register" class="register">
    <div class="register-main">
      <form @submit.prevent="submit">
        <div class="field">
          <span>
            <img src="../images/icon/gd.png">
            工地
          </span>
          <input type="text" v-model="site">
        </div>
        <div class="field">
          <span>
            <img src="../images/icon/ssdw.png">
            所属工单
          </span>
          <select  v-model="jobOrder">
            <option value="">请选择</option>
            <option v-for="item in items" v-bind:value="item.id">{{item.workOrderName}}</option>
          </select>
        </div>
        <div class="field">
          <span>
            <img src="../images/icon/azwz.png">
            安装位置
          </span>
          <input type="text" v-model="InstallationLocation">
        </div>
        <div class="field">
          <span>
            <img src="../images/icon/azr.png">
            安装人
          </span>
          <input type="text" v-model="user">
        </div>
        <div class="field">
          <span>
            <img src="../images/icon/azsj.png">
            安装时间
          </span>
          <div class="weui-cell">
            <div class="weui-cell__bd">
              <input class="weui-input" type="date" value="" v-model="time">
            </div>
          </div>
        </div>
        <div class="field field-img">
          <span>
            <img src="../images/icon/zp.png">
            照片
          </span>
          <div><img class="addimg" src="../images/icon/tjtp.png"></div>
        </div>
      </form>
    </div>
    <input type="submit" class="submit" value="提交"  @click="gounreg()">
    <v-scan @click="scanClick()"></v-scan>
  </div>
</template>

<script>
  import Scan from './scan.vue';
  export default {
    name: 'Register',
    data(){
      console.log("---------",this.$route.params.id);//上一页带过来的参数
      return {
        site:"",
        jobOrder:"",
        time:"",
        InstallationLocation:"",
        user:"",
        items:{

        }
      }

    },
    created (){
      this.$http.get('/static/findTodoTasks.json',{
          params: {
            productType:"1",
            pageNum:1,
            pageLimit:8
          }
        })
        .then(
          function(response){
            console.log(response);
            this.items =response.data.data.result;
            //this.$set(this.items,response.data.data.result);
            console.log(this.items);
          },
          function(response){
            console.log(response);
          }
        )
    },
    methods: {
      gounreg:function(){
        //提交数据
        this.$http.get('/static/findTodoTasks.json',{
            params: {
              id:this.$route.params.id,
              site:this.site,
              jobOrder:this.jobOrder,
              InstallationLocation:this.InstallationLocation,
              user:this.user,
              time:this.time,
            }
          })
          .then(
            function(response){
              this.$router.push({
                path: '/UnregisteredDevice'
              })
            },
            function(response){
              console.log(response);
            }
          )

      },
      setTitle : function(t) {
        console.log(t);
        document.title = t;
        var i = document.createElement('iframe');
        i.src = '//m.baidu.com/favicon.ico';
        i.style.display = 'none';
        i.onload = function() {
          setTimeout(function(){
            i.remove();
          }, 9)
        }
        document.body.appendChild(i);
      }
    },
    mounted(){
      this.setTitle('设备登记')
    },
    components:{
      'v-scan': Scan
//      calendar: require('./calendar.vue')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../css/register.css";
</style>
