<template>
  <div id="Remarks" class="remarks">
    <div class="Remarks-main">
      <form @submit.prevent="submit">
        <table>
          <tr class="field">
            <td class="tdle">
                <img src="../images/icon/azr.png">
                姓名
            </td>
            <td class="tdwid">
              <input type="text" v-model="name">
            </td>
          </tr>
          <tr class="field fieldTop">
            <td class="tdle">
              <img src="../images/icon/dh.png">
              电话
            </td>
            <td class="tdwid">
              <input type="text" v-model="Telephone">
            </td>
          </tr>
          <tr class="field fieldTop">
            <td class="tdle">
              <img src="../images/icon/azsj.png">
              时间
            </td>
            <td class="tdwid">
              <div class="weui-cell">
                  <div class="weui-cell__bd">
                      <input class="weui-input" type="date" value="" v-model="time">
                  </div>
              </div>
            </td>
          </tr>
          <tr class="field fieldTop remar field-img">
            <td class="tdle">
              <img src="../images/icon/bz.png">
              备注
            </td>
            <td class="tdwid">
            <textarea  v-model="remarks"></textarea>
            </td>
          </tr>
          <tr class="field field-img fieldTop">
            <td class="tdle">
              <img src="../images/icon/fj.png">
              附件
            </td>
            <td class="tdwid imglist">
              <span @click="Photograph()"><img class="addimg" src="../images/icon/tjtp.png"></span>
            </td>
          </tr>
        </table>
      </form>
    </div>
    <input type="submit" class="submit" value="提交" @click="godevilist()">
    <v-scan @click.native="scanClick()"></v-scan>
  </div>
</template>

<script>
  console.log("<---------63",wx);
  import Scan from './scan.vue';
  export default {
    name: 'Remarks',
    data(){
      console.log("---------",this.$route.params.id); //上一页带过来的参数
      return {
          name: "",
          Telephone: "",
          time: "",
          remarks: ""
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
        );
      this.$http.get('/static/config.json',{
          params: {
            id:this.$route.params.id
          }
        })
        .then(
          function(response){
            console.log("responser",response.data.data.appId);
            wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: response.data.data.appId, // 必填，公众号的唯一标识
              timestamp: response.data.data.timestamp , // 必填，生成签名的时间戳
              nonceStr: response.data.data.nonceStr, // 必填，生成签名的随机串
              signature: response.data.data.signature, // 必填，签名
              jsApiList: [
                'chooseImage',//拍照或从手机相册中选图接口
                'scanQRCode'// 微信扫一扫接口
              ] // 必填，需要使用的JS接口列表
            });
          },
          function(response){
            console.log(response);
          }
        )
    },
    methods: {
      godevilist:function(e){   //提交数据
        this.$http.get('/static/findTodoTasks.json',{
            params: {
              id:this.$route.params.id,
              name:this.name,
              Telephone:this.Telephone,
              time:this.time,
              remarks:this.remarks
            }
          })
          .then(
            function(response){
              this.$router.push({
                path: '/DeviceList'
              })
            },
            function(response){
              console.log(response);
            }
          )
      },
      Photograph:function(){  //拍照功能

      },
      scanClick: function(){ //扫一扫功能
        console.log("<<<=======>>>");
        wx.ready(function() {
          wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
              console.log("res",res);
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            }
          });
        });
      },
      setTitle : function(t) { //更新title  有问题，需要刷新才能更换
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
      this.setTitle('备注')
    },
    components:{
      'v-scan': Scan
    //      calendar: require('./calendar.vue')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../css/remarks.css";
</style>
