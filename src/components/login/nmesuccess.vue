<template>
  <div class="phoneReg">
     <titleimg class="imgbotom" :msg= "msgT" ></titleimg> 
     <p class="pfxi successp">恭喜您创建成功</p>
      <img class="phoneImg borders imgtitle" :src="imageSrc"/>
      <p class="nametitle pfxi">{{name}}</p>
       <img class="phoneImg borders tilenext" src="../../assets/img/bigadmin.png" />
     <div class="borderfor pfxi next" @click="nextStep" :class="{ nextgotext: nextdones}">进入我的诊所</div>
  </div>
</template>
<script>
import titleimg from '../common/login/titileImg.vue'
import { mapGetters } from 'vuex'
export default {
  data(){
     return{
      msgT :false,
      imageSrc:'',
      nextdones:false,
      name:"张龙"
     }
  },
  components:{
      titleimg
    },
      computed:{
      ...mapGetters({
            username:'username'
          })
    },
   created(){
        document.title="创建成功"
        var img = getStore("userAll");
         this.imageSrc = JSON.parse(img).faceimg;
       this.name = this.username;
     // this.number = this.imageUrl[1]
  },
  methods:{
    nextStep(){
     this.nextdones = true;
    }
  }
}

</script>A
<style lang="less" scoped>
  @import '../../common/css/animations.css';
.successp{
  margin-top:1.28rem;
  font-size:0.427rem;
  color:#434a54;
  margin-bottom:0.587rem;
  text-align: center;
}
.imgtitle{
  width:2.667rem;
  height:2.667rem;
}
.nametitle{
  color:#434a54;
  font-size:0.827rem;
  margin-top:0.533rem;
  margin-bottom:1.653rem;
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
.next{
width:7.667rem;
  border:1px solid #d4d4d4;
  height:1.067rem;
  margin:0 auto;
  line-height:1.067rem;
  margin-top:1.76rem;
  font-size:0.427rem;
  color:#434a54;
  text-align:center;
}
.tilenext{
  width:2.0rem;
}
  .nextgotext{
     background:rgba(112,186,209,0.6);
  }

</style>