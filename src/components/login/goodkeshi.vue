<template>
	<div class="phoneReg">
        <titleimg class="imgbotom"></titleimg>
        <div v-for="(value,index) in items" :key="index" class="classify_style ">
        <div @click="todo(value.name,value.code,value.id)" class="border pfxi">
            <span >{{ value.name }}</span><span style="display:none">{{value.code}}</span><span style="display:none">{{value.id}}</span>
            <div :class='{"pic_down": cell!== value.name,"pic_up": cell=== value.name}' ></div>
         </div>
            <ul :class='{"show" : cell === value.name }' class="hide pfxi" >
                <li v-for="(value,index) in itemslist" :key="index" class="pfxi" :class="{keshiactive :trues == value.name}" @click="homeChoose(value.name,value.id)">{{value.name}} <span v-if="keshiv">{{value.id}}</span></li>
              <div style="clear:both"></div>
            </ul>
        </div>
    </div>
</template>
<script>
import titleimg from '../common/login/titileImg.vue'
import { mapMutations ,mapGetters} from 'vuex'
import api from "../../api/login/login.js"
export default {
      data(){
            return{
                items: [],
                classItem:{},
                cell:null,
                trues:null,
                keshiv:false,
                bigCode:null,
                itemslist:[],
                codes:null
            }

        },
    watch:{
      $route(){ 

            if(this.bigCode !=this.userhome.bigCode ){
           // api.sickness(_this.userhome.bigCode+"&smallCode="+_this.userhome.smallCode).then(function(json){
           //    console.log(json.data.data)
           //    // _this.items = json.data.data;
           //     // _this.cell = _this.items[0].name;
           //    // console.log(this.items);
           // })
            }
          }
    },
	components:{
		  titleimg
		},
		 created:function(){
      document.title="选择疾病"
            var _this = this;
            _this.bigCode = _this.userhome.bigCode;
            console.log(_this.userhome)
             api.sendoffice(1).then(function(json){
              // for(var i = 0; i <  json.data.data.length; i++){
              //     var datas ;
              //      console.log(json.data.data[i].name)
              //      if(json.data.data[i].name.includes("其它")){
              //         json.data.data.splice(i,1);
              //      }
              //      _this.items = json.data.data.push(json.data.data[i]);
              // }
              _this.items = json.data.data;
           })
              api.sickness(15).then(function(json){
                 _this.itemslist = json.data.data;
                 _this.cell = _this.items[0].name;
                
                 _this.codes = 15
              // console.log(this.items);
              })

        },  
  computed:{
      ...mapGetters({
            userhome:'userhome'
          })
    },
        methods:{
            ...mapMutations([
               'USER_HOME',

            ]),
            homeChoose(items,event){
                 this.trues = items;
                 var _this = this;
                 var name = {
                    text:items,
                    id : event
                 }
                 _this.USER_HOME(name);
                 console.log(_this.USER_HOME)
                setTimeout(function(){
                      _this.$router.push("/good")
                    },100)
               
            },
            todo:function(key,code,id){
              if(key.includes("其")){
                var name = {
                   "text":"其它",
                   "id":id
                }
                this.USER_HOME(name);
                this.$router.push("/good")
              }else{


              if(this.codes != code){


              this.codes = code;
              var _this = this;
              _this.itemslist  = [];
             api.sickness(code).then(function(json){
                 _this.itemslist = json.data.data;
                 // _this.cell = _this.items[0].name;
                 _this.cell = key;
                 _this.codes = code
              // console.log(this.items);
              })
           }
            }
             }
        }
}

</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';
.imgbotom{
  margin-bottom:1.013rem;
}
.phoneReg{
  	text-align: center;
  	position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    background:#f3f4f6;
}
.keshistyle{
   background:#f3f4f6;
   padding-top:0.267rem;
}
.keshiactive{
    background:#70bad1 !important;
    color:#fff !important;
}
.pic_down{
    border-right: 2px solid #cdced0;
    border-top: 2px solid #cdced0;
}
.pic_up{
    border-left: 2px solid #cdced0;
    border-bottom: 2px solid #cdced0;
}
.pic_down,.pic_up{
    height: 0.267rem;
    width: 0.267rem;
    float: right;
    margin-right: 1.333rem;
    margin-top: 0.053rem;
    transform: rotate(135deg);
    -ms-transform:rotate(135deg);   
    -moz-transform:rotate(135deg);
    -o-transform:rotate(135deg);
    -webkit-transform: rotate(135deg);
}

    .hide{
        height: 0px;
        display: none;
    }
    .show{
        height: auto;       
        display: block;
        margin-left: .453rem;
         padding-top: .267rem;
         padding-bottom: .347rem;
    }
.border{
    overflow: hidden;
    border-bottom:1px solid #cdced0;
    padding-bottom: 0.533rem;
    letter-spacing: 0.08em;
    padding-top: 0.667rem;
}

.border:after{
    height: 1px;
    content: '';
    width: 100%;
    // border-top: 1px solid #cdced0;
    position: absolute;
    bottom: -1px;
    right: 0;
    transform: scaleY(0.5);
    -webkit-transform:scaleY(0.5);
}

.border span{
    display: inline-block;
    float: left;
    margin-left: 0.533rem;
    font-size: 0.427rem;
    color: #333;
}

.classify_style{
    width: 10.0rem;
    height: auto;
    font-size: 0.427rem;
    color: #333;
    position: relative;
    clear: left;
}

.clearfix:after{
    content:'';
    clear:both;
    display:block;
    height: 0;
    visibility:hidden;
}
.clearfix{
    zoom:1;
}

.show li{
    float: left;
    margin-right:0.347rem;
    margin-bottom: 0.267rem;
    letter-spacing: 0.05em;
    display:inline;
    padding: 0.267rem  0.5rem;
    width:auto;
    border-radius:30px;
    background:#fff;
    font-size: 0.373rem;
    color: #333;
    
}
.five_words{
    width: 3.333rem;
}
.four_words{
    width: 2.933rem;
}
.three_words{
    width: 2.4rem;
}
.two_words{
    width: 2.133rem;
}
.two_words,.three_words,.four_words,.five_words{
    height: 0.933rem;
    line-height: 0.933rem;
    border-radius: 0.933rem;
    text-align: center;
    font-size: 0.373rem;
    // background-color: #fff;
}
</style>