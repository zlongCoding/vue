<template>
  <div id="Devicedetails" class="devicedetails">
    <div class="Devicedetails-position">
      <div class="position-title"><div></div><i>设备位置</i></div>
      <form @submit.prevent="submit">
        <table>
          <tr class="field">
            <td class="tdleft">
              <img src="../images/icon/ssxm.png">
              所在项目
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.currentPosition.position1}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <img src="../images/icon/gd.png">
              所在工地
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.currentPosition.position2}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <img src="../images/icon/azwz.png">
              所在位置
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.currentPosition.assetPosition}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <img src="../images/icon/azr.png">
              安装人
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.currentPosition.user}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <img src="../images/icon/azsj.png">
              安装时间
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.currentPosition.time}}</span></td>
          </tr>
        </table>
      </form>
    </div>

    <div class="Devicedetails-position matop20">
      <div class="position-title"><div></div><i>照片查看</i></div>
      <form @submit.prevent="submit">
        <table>
          <tr class="field field-img">
            <td class="tdright"><img class="addimg" src="../images/icon/img.png"></td>
          </tr>
        </table>
      </form>
    </div>

    <div class="bott">
      <input type="submit" class="submit marig40" value="备注"  @click="goRem(info.id)">
      <input type="submit" class="submit" value="撤销登记">
    </div>

    <div class="Devicedetails-position">
      <div class="position-title"><div></div><i>设备信息</i></div>
      <form @submit.prevent="submit">
        <table>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              设备名称
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.assetName}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              设备分类
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.equipmentName}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              设备编号
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.deviceCode}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              规格型号
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.specifications}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              资产编号
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.assetCode}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              资产状态
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.assetStatus}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              单价
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.price}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              折旧期限(月)
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.durableYears}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              残值率(%)
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.residualRate}}</span></td>
          </tr>
          <tr class="field">
            <td class="tdleft">
              <div class="tdle"></div>
              月折旧率(%)
            </td>
            <td class="tdright"><span class="pf40 disbok">{{info.depreciationRate}}</span></td>
          </tr>
        </table>
      </form>
    </div>

    <div class="Devicedetails-position matop20 pb20">
      <div class="position-title borTop"><div></div><i>生命周期</i></div>
      <div class="cycle" v-for="item in items">
        <div><p class="sizecolor dis">{{item.createTime}}</p><span class="sign">{{item.operation}}</span></div>
        <p><span class="sizecolor">操作人：</span>{{item.createUserName}}</p>
        <p><span class="sizecolor">备注：</span>{{item.operationDetail}}</p>
      </div>
    </div>
    <v-scan @click="scanClick()"></v-scan>
  </div>
</template>
<!--assetName:设备名称  equipmentName:设备分类 deviceCode:设备编号 specifications:型号 assetCode:资产编号 assetStatus:资产状态 price:单价
    durableYears：折旧期限 residualRate:残值率 depreciationRate:月折旧比 relatedAttachId附件id -->
<script>
  import Scan from './scan.vue';
  export default {
    name: 'Remarks',
    data(){
      console.log("---------",this.$route.params.id);//上一页带过来的参数
      return {
        info:{
          id:"",
          szxm: "",
          szgd: "",
          szwz: "",
          azr: "",
          azsj: "",
          assetName: "",
          equipmentName: "",
          deviceCode: "",
          specifications:"",
          assetCode:"",
          assetStatus:"",
          price:"",
          durableYears:"",
          residualRate:"",
          depreciationRate:"",
          relatedAttachId:"",
          currentPosition:{
            position1:"",
            position2:"",
            assetPosition:"",
            user:"",
            time:""
          }
        },
        items:[{

        }]
      }
    },
    created (){
      this.$http.get('/static/findTrackingInfo.json',{
          params: {
            assetCode:""
          }
        })
        .then(
          function(response){
            this.info =response.data.data;
            //this.$set(this.items,response.data.data.result);
            console.log(this.info.currentPosition);
            var aa = JSON.parse(response.data.data.currentPosition);
            console.log("aa",aa);
            this.info.currentPosition = aa;
            console.log("....",this.info);
          },
          function(response){
            console.log(response);
          })
      this.$http.get('/static/findTrackingList.json',{
          params: {
            assetCode:""
          }
        })
        .then(
          function(response){
            this.items =response.data.data.result;
            //this.$set(this.items,response.data.data.result);
          },
          function(response){
            console.log(response);
          })
    },
    methods:{
      goRem:function(e){
        this.$router.push({
          name: 'Remarks',
          params:{id:e}
        })
      },
      setTitle : function(t) {
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
      this.setTitle('生命周期')
    },
    components:{
      'v-scan': Scan
//      calendar: require('./calendar.vue')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../css/devicedetails.css";
</style>
