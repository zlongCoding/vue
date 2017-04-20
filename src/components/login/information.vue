<template>
  <div class="phoneReg">
          <titleimg class="imgbotom" :msg= "msgT" ></titleimg>
           <div class="changeline"></div>
          <div class="jincheng">2/3</div>
          <div class="phonetext border pfxi iftimgs  " >
             <input  type="text" class="inputs paddingfor" placeholder="真实姓名"  v-model="realName" v-on:focus="chenkClass" :class="{inputimg : inputimgs}"/>
             <div><img :src="imgUrlT" @click="imgUrOc(1)"/><img :src="imgUrlO" @click="imgUrOc(0)"/></div> 
          </div>
          <div class="phonetext border pfxi iftimg ifmations paddingfor"  @click="hospitalSelect">
             <span class="ifnspans"><span>{{hospitalText}}</span></span><span class="infspan"><i class="right-arrow1"></i><i class="right-arrow2"></i></span>
          </div>
          <div class="phonetext border pfxi iftimg ifmations paddingfor" @click="homeSelect">
             <span class="ifnspans"><span>{{homeText}}</span></span><span class="infspan"><i class="right-arrow1"></i><i class="right-arrow2"></i></span>
          </div>
           <div class="phonetext border pfxi iftimg margintop paddingfor" id="showBank"><!-- @click="selects" -->
           <span class="pfxianxi" v-if="celsdds" >职称</span>

            <select v-model="selected" class="xb_select changoption" @change="selectSexs" :class="{  xb_selects: isActive }">
             <option v-for=" item in itemoption" v-bind:value="item.id">{{item.name}}</option>
           </select>
           <span class="infspan infspanimg"><i class="right-arrow1"></i><i class="right-arrow2"></i></span>
             <!-- <span class="ifnspans" id="bankId"><span>{{changemessage}}</span></span><span style="display:none">{{changemegid}}</span><span class="infspan"><i class="right-arrow1"></i><i class="right-arrow2"></i></span> -->
          </div>
          <div class="iftcontent" :class="{ errorMsg: isStyleFalse}">{{errMsg}}填写错误</div>

          <div class="next borderfor pfxi"  @click="operateFinish"  :class="{ nextgotext: nextdones}">下一步</div>
    </div>
</template>
<script>
import titleimg from '../common/login/titileImg.vue'
import { chinese ,getStore,isIOS} from '../../common/js/test.js'
import { mapGetters,mapMutations } from 'vuex'
import api from '../../api/login/login.js'
import '../../common/css/selects.css'
export default {
  data(){
     return{
      msgT :true,
      hospitalText:"所在医院",
      realName:null,
      homeText:"所在科室",
      changemessage:"职称",
      imgUrlO:'/static/man.png',
      imgUrlT:'/static/womanco.png',
      imgUrl : ['/static/man.png','/static/womanco.png'],
      chageUrl:['/static/manco.png','/static/woman.png'],
      sexnum:null,
      homeId:null,
      itemoption:[],
      changemegid:null,
      hospitalId:null,
      adminnum:[],
      addall:false,
      nextdones:false,
      inputimgs:false,
      isStyleFalse:false,
      errMsg:null,
      isActive: false,
      selected:null,
      celsdds:true,
      userphone:null,
      userIds:null,
      keshiID:null
     }
  },
  components:{
      titleimg
    },
mounted(){

},
    created(){
      var _this = this;
       document.title="创建您的个人档案";
       var userAll = getStore("userAll");
      var id =JSON.parse(userAll)
       this.userIds=id.id
        var  _this = this;
        _this.itemoption=[];
        _this.keshiID = _this.userkeshi;
        api.sendezhicheng(_this.userkeshi).then(function(json){
           if(json.data.data == null){

          }else{
               for(var i = 0 ; i < json.data.data.length;i++){
                 var listp = {};
                 listp.name = json.data.data[i].name;
                 listp.id = json.data.data[i].id;
                   _this.itemoption.push(listp)
                            // _this.selected = _this.itemoption[0].id
               }
               }
        })
    if(isIOS){
       this.isActive = true;
    }
    },
  computed:{
      ...mapGetters({
            userhosptil:'userhosptil',
            userhome:'userhome',
            userphone:'userphone',
            userkeshi:'userkeshi'
          })
    },
    watch:{
      $route(){

        console.log(this.userhosptil  == "")
        if(this.userhome == ""){
          this.homeText = "所在科室"
        }else{
          this.homeText = this.userhome.text;
          this.homeId = this.userhome.id;
        }

            if(this.userhosptil == ""){
              this.hospitalText = "所在医院"
            }else{
              // console.log(this.userhosptil)
              this.hospitalText =this.userhosptil.name;
              this.hospitalId = this.userhosptil.cityId;
            }
           if(this.keshiID != this.userkeshi){
              
              this.keshiID = this.userkeshi;
              var  _this = this;
              _this.itemoption=[];
                  api.sendezhicheng(_this.userkeshi).then(function(json){
                    _this.celsdds = true;
                    if(json.data.data == null){

                    }else{
                        for(var i = 0 ; i < json.data.data.length;i++){
                          var listp = {};
                          listp.name = json.data.data[i].name;
                          listp.id = json.data.data[i].id;
                            _this.itemoption.push(listp)
                            // _this.selected = _this.itemoption[0].id
                        }
                        }
                 })
           }
            
            // this.hospitalId = this.userhosptil.cityId;
           //  var _this = this;
           //  if(_this.fromkeshi != null && _this.fromkeshi == _this.userkeshi){
           //  }else{
           //     _this.fromkeshi=_this.userkeshi;
           //      _this.selected = "请选择"
           //    _this.selectDiv()
           //  }
           // _this.fromkeshi=_this.userkeshi;
          },
          selected(curVal,newVal){
             if(newVal != null){
               this.celsdds = false;
             }
          }
    },
    activated(){
       this.adminUrl()
    },
  methods:{
     ...mapMutations([
      'USER_NAME'
    ]),
    chenkClass(){
      this.inputimgs = false;
      this.isStyleFalse = false;
    },
    adminUrl(){
      // var _this = this;
      //   api.sendezhicheng(this.userkeshi).then(function(json){
      //     _this.adminnum = json.data.data;
      //     console.log(json.data.data)
      //   })
    },
    imgUrOc(num){
      this.isStyleFalse = false;
      if(num == 0){
         this.imgUrlO = this.chageUrl[num];
         this.imgUrlT = this.imgUrl[1]
         this.sexnum = "男"
      }else{
        this.imgUrlO = this.imgUrl[0];
        this.imgUrlT = this.chageUrl[num]
        this.sexnum = "女"
      }

    },
    hospitalSelect(){
        this.$router.push("/search");
        this.isStyleFalse = false;
     },
    homeSelect(){
        this.$router.push("/keshi");
        this.isStyleFalse = false;
    },
    // selects(){

    // },
    selectSexs(){
        var _this = this;
        _this.celsdds = false;
        // _this.optionname = false;
        // if(_this.selected == null){
    //                _this.selected="请选择";
        // }
               if(_this.selected != "" || _this.selected != null ){
                     _this.celsdds = false;
               }
      },
    operateFinish(){
        const _this = this;
        _this.nextdones = true;
        // _this.$router.push("/good");
        if(chinese.test(_this.realName) && _this.realName.length <= 6){
      
        
      if(_this.realName != null && _this.sexnum!=null && _this.hospitalText != "所在医院" && _this.homeText !="所在科室"  &&_this.selected != null &&  _this.sexnum!="请选择" && _this.selected !="请选择"){
                
                // setStore("registerdoct","true")
                var codes;
                if(_this.sexnum == "男"){
                      codes = 1;
                }else if(_this.sexnum == "女"){
                   codes = 2;
                }
                var data = {
                  "id":_this.userIds,
                  "name":_this.realName ,
                  "sex":codes,
                  "type":_this.userkeshi,
                  "hospital":_this.hospitalId,
                  "department":_this.homeId,
                  "level":_this.selected,
                  "phoneNumber":_this.userphone
                }
                 _this.USER_NAME(_this.realName)
            api.registerMessge(data).then(function (json) {
             _this.$router.push("/good");
             _this.USER_NAME(_this.realName)
          })
              }else{
                if(chinese.test(_this.realName) == false){
                      _this.inputimgs = true;
                      _this.nextdones = false;
                      _this.isStyleFalse= true;
                      _this.errMsg = "姓名"
                }else if(_this.realName.length > 6 ){
                       _this.inputimgs = true;
                       _this.nextdones = false;
                       _this.isStyleFalse= true;
                       _this.errMsg = "姓名"
                 }else if(_this.realName == null ){
                       _this.inputimgs = true;
                       _this.nextdones = false;
                       _this.isStyleFalse= true
                       _this.errMsg = "姓名"
                 }else if(_this.sexnum == null || _this.sexnum =="请选择"){
                       _this.isStyleFalse= true
                       _this.nextdones = false;
                       _this.errMsg = "性别"
                 }else if(_this.hospitalText == null || _this.hospitalText =="所在医院"){
                       _this.isStyleFalse= true
                       _this.nextdones = false;
                       _this.errMsg = "所在医院"
                 }else if(_this.homeText == null || _this.homeText =="所在科室"){
                       _this.isStyleFalse= true;
                       _this.nextdones = false;
                       _this.errMsg = "所在科室"
                 }else if(_this.selected == null || _this.selected =="请选择" ){
                       _this.isStyleFalse= true;
                       _this.nextdones = false;
                       _this.errMsg = "职称"
                 }
              }
       }else{
          _this.inputimgs = true;
          _this.isStyleFalse= true
          _this.nextdones = false;
          _this.errMsg = "姓名"
       }
      }
  }
}
</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';
.imgbotom{
  margin-bottom:2.853rem;
}
 .phoneReg{
    text-align: center;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background:#f3f4f6;
  }
  .phonetext{
    margin:0 auto;
    width:7.667rem;
    border-bottom: 1px solid #d4d4d4;
    .input{
      
      height:0.4rem;
      width:7.667rem;
      margin-bottom:0.56rem;
      font-family: PingFangSC-Light;
    }
    .inputs{
          color:#434a54;
          width: 100%;
          height:0.5rem;
          line-height:.5rem;
          padding-bottom:0.53rem;
          font-size:0.4rem;
          font-family: PingFangSC-Light;
          background:#f3f4f6;
             }
    div{
        width: 1.813rem;
        position: absolute;
        top: -.3rem;
        right: 0px;
         padding-bottom:0.26rem;

    }
  }
  .ifnspans{
    span{
      color:#434a54;
      width:80%;
      display:inline-block;
      text-overflow:ellipsis;
      overflow: hidden;
      white-space:nowrap;
      font-size: 0.373rem;
      height:.5rem;
      line-height:.5rem;
    }
  }
  .iftimg{
    position:relative;
    div{
      width:1.813rem;
    }
    img:nth-child(1){
      float:right;
      margin-left:0.32rem;
    }
    img:nth-child(2){
      float:right;
    }
     img{
      width:0.667rem;
      height:0.667rem;
     }
     .ifnspans{
         display:inline-block;
          margin-bottom: 0.56rem;
     }
  }
  .iftimgs{
        margin-top:1.013rem;
        position:relative;
    div{
      width:1.813rem;
    }
    img:nth-child(1){
      float:right;
      margin-left:0.32rem;
    }
    img:nth-child(2){
      float:right;
    }
     img{
      width:0.667rem;
      height:0.667rem;
     }
     .ifnspans{
         display:inline-block;
          margin-bottom: 0.56rem;
     }
  }
  .infspan{
    position:absolute;
    right:  0.5rem;
    top:1rem;
  }
        .right-arrow1,.right-arrow2{
            width:0;
            height:0;
            display:block;
            position:absolute;
            left:0;
            top:0;
            border-top:10px transparent dashed;
            border-right:10px transparent dashed;
            border-bottom:10px transparent dashed;
            border-left:10px white solid;
            overflow:hidden;
        }
        .right-arrow1{
            left:1px;
            border-left:10px #d4d4d4 solid;
        }
        .right-arrow2{
            border-left:10px #f3f4f6 solid;
        }
  .ifnspans{
    width:100%;
    text-align: left;
    font-size:0.373rem;
  }
  .ifmations{
    padding-top:1.013rem;
  }
  .iftcontent{
    font-size:0.373rem;
    color:#e63838;
    opacity:0;
  }
  .inputimg{
    color:#e63838;
  }
  .next{
  width:7.667rem;
  border:1px solid #d4d4d4;
  height:1.067rem;
  margin:0 auto;
  line-height:1.067rem;
  margin-bottom:1.307rem;
  font-size:0.427rem;
  color:#434a54;
  margin-top: 1.093rem; 
}
.changeline{
  position:absolute;
  width:66.666%;
  height:0.133rem;
  background:#70bad1;
  top:0px;
  left:0px;
}
.xb_selects{
      margin-left:-0.14rem !important;
}
.jincheng{
   position:absolute;
   top:0.453rem;
   right:.3rem;
   font-size:0.32rem;
}

  .showMsg{
    height: 0.4rem;
    line-height: 0.4rem;
    margin-top: 0.333rem;
    letter-spacing: 0.02em;
    color: #e63838;
    opacity: 0;
    width: 7.667rem;
    text-align: left;
    margin: 0 auto;
    margin-top: 0.333rem;
  }
    .errorMsg{
    opacity:1;
  }
.pfxianxi{
  color:#434a54;
  font-size: 0.373rem;
    height:0.373rem;
    position: absolute;
    left: 0.187rem;
    display:inline-block;
}
.changoption{
  padding-bottom:0.533rem;
  width: 100%;
  background:#f3f4f6;
  -moz-appearance: none;
-webkit-appearance: none;
appearance: none;
border:none;
    height: 100%;
    font-size: 0.373rem;
    color:#434a54;
    font-family: PingFangSC-Light !important;
}
 input::-webkit-input-placeholder { /* WebKit browsers */  
      color: #434a54;  
  }  
  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
     color: #434a54;  
  }  
  input::-moz-placeholder { /* Mozilla Firefox 19+ */  
     color:  #434a54;   
  }  
  input:-ms-input-placeholder { /* Internet Explorer 10+ */  
     color:  #434a54;  
  } 
.nextgotext{
     background:rgba(112,186,209,0.6) !important;
  }
  .margintop{
    margin-top:1.013rem;
    margin-bottom:0.667rem;
  }
  .infspanimg{
     top:0px
  }
  .xb_selects{
  margin-left:-0.14rem;
  }
</style>