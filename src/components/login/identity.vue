<template>
  <div class="phoneReg">
          <titleimg  class="imgbotom" :msg= "msgT" ></titleimg>

          <div class="changeline"></div>
          <div class="jincheng pfxi">1/3</div>

          <div class="keshi keshio pfxi" :class="{active :actived == comfrom[0]}" @click="runnext($event,1)">
              <img src="../../assets/img/clinical.png" />
              <div class="aa">{{comfrom[0]}}</div>
          </div> 
         <div class="keshi keshit pfxi" :class="{activet :actived == comfrom[1]}" @click="runnext($event ,2)">
              <img  src="../../assets/img/nursing.png"/>
              <div class="aa">{{comfrom[1]}}</div>
          </div>   
           <div  class="keshi keshio pfxi" :class="{active :actived == comfrom[2]}" @click="runnext($event ,3)">
              <img  src="../../assets/img/function.png"/>
              <div class="aa">{{comfrom[2]}}</div>
          </div>   
          <div class="keshi keshit pfxi" :class="{activet :actived == comfrom[3]}" @click="runnext($event ,4)">
              <img  src="../../assets/img/test.png"/>
              <div class="aa">{{comfrom[3]}}</div>
          </div>   
        <div class="keshi keshio pfxi"  :class="{active :actived == comfrom[4]}"  @click="runnext($event,5)">
              <img  src="../../assets/img/drug.png" />
              <div class="aa">{{comfrom[4]}}</div>
          </div>  
         <div class="keshi keshit pfxi" :class="{activet :actived == comfrom[5]}"  @click="runnext($event,6)">
              <img   src="../../assets/img/admin.png"/>
              <div class="aa">{{comfrom[5]}}</div>
          </div>        
    </div>
</template>
<script>
import titleimg from '../common/login/titileImg.vue'
import { mapGetters,mapMutations } from 'vuex'
import { isAndroid } from '../../common/js/test.js'
export default {
  data(){
     return{
      comfrom:[
        "临床科室",
        "护理部",
        "功能科室",
        "检验科室",
        "药剂科室",
        "行政科室"
               ],
      msgT :true,
      imgUrl : ['/static/clinical.png','/static/nursing.png','/static/function.png','/static/test.png','/static/drug.png','/static/admin.png'],
      actived:null,
      acId :null,
      activedt:null,
      iscall:false
     }
  },
  created(){
     document.title="手机注册";
     if(isAndroid){
         this.iscall = true;
     }

  },
   watch:{
     $route(){
       this.actived = null;
       console.log("aaaaaa")
     }
   },
  components:{
      titleimg
    },
  methods:{
    ...mapMutations([
         'USER_KESHI',
    ]),
    go(){
     this.actived = null;
    },
    runnext(event,number){
            this.USER_KESHI(number)
             var el = event.currentTarget;
            this.actived=el.querySelectorAll(".aa")[0].innerHTML
            var _this = this;
            
            setTimeout(function(){
              _this.$router.push("/inft");
            }, 100)
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';
.imgbotom{
  margin-bottom:2.3rem;
}
.imgbotoms{
  margin-bottom:2rem;
}
.changeline{
  position:absolute;
  width:33.33%;
  height:0.133rem;
  background:#70bad1;
  top:0px;
  left:0px;
}
.jincheng{
   position:absolute;
   top:0.453rem;
   right:.3rem;
   font-size:0.32rem;
}

 .phoneReg{
    text-align: center;
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    background:#f3f4f6;
  }
  .keshi img{
    width:0.667rem;
    margin-bottom:0.187rem;
  }
  .keshi div{
    font-size:0.373rem;
    color:#000;
  }
.keshi{
    padding-top:.4rem;
    height: 1.7rem;
}
.keshio{
   background:rgba(67, 74, 84,0.03);
}
.keshit{
  background:rgba(67, 74, 84,0.05) ;
}
.active{
  background:rgba(99, 218, 224,0.2) !important;
}
.activet{
  background:rgba(99, 218, 224,0.25) !important;
}
</style>