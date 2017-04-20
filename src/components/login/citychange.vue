<template>
  <div v-if="showMe">
    <div class="word border">
      <div class="word_select">
        <ul ref="businessLeft">
          <li v-for="(item , index) in hostWords" @click="leftControlRightScroll(index)" :key="index" class="cityli borders pfxi" :class='{active_ia:index == 0}'>{{item.word}}</li>
        </ul>
      </div>
    </div>
    <div  class="cityall"  ref="ullist">
    <div class="city_select" v-for="(value,key) in allCity">
      <div class="type_title">
        <div class="keyStyle pftn ">{{key}}</div>
        </div>
      <ul>
        <li v-for="(items , index) in value" @click="hostCity({ci:items.city , ids: items.id})" class="pfxi border" :key="index">{{items.city}}<span v-if="cityId">{{items.id}}</span></li>
      </ul>
      <p></p>
    </div>
    </div>
  </div>
</template>
<script>
 import api from '../../api/login/login.js'
 import { mapMutations } from 'vuex'
    export default {
    data(){
      return{
        showMe: false,
        hostWords:[
                   {"word" : "热"},
                    {"word" :"A"},
                    {"word" :"B"},
                    {"word" :"C"},
                    {"word" :"D"},
                    {"word" :"E"},
                    {"word" :"F"},
                    {"word" :"G"},
                    {"word" :"H"},
                    {"word" :"J"},
                    {"word" :"K"},
                    {"word" :"L"},
                    {"word" :"M"},
                    {"word" :"N"},
                    {"word" :"P"},
                    {"word" :"Q"},
                    {"word" :"R"},
                    {"word" :"S"},
                    {"word" :"T"},
                    {"word" :"W"},
                    {"word" :"X"},
                    {"word" :"Y"},
                    {"word" :"Z"},
                  ],

        allCity:[],
        cityId:false
      }
    },
    watch: { 
    
    showMe: function (value) { 
      if (value) {
        this.$nextTick(() => {
          this.init();
        });
      }
    }
  },
  created(){


  },
  mounted (){
      this.showMe= true; 
   var _this = this;
    api.searchCity().then(function(json){
    var data = json.data.data;
    var datas = {};
     datas.全国热门城市= data.I;
     delete data.I;
  function mergeObj(o1,o2){
       for(var key in o2){
           o1[key]=o2[key]
       }
       return o1;
    }
      data = mergeObj(datas,data);
      _this.allCity = data;
    var items = [];
   for(var i  in _this.allCity){
       items = items.concat(_this.allCity[i])
       // items.push(_this.allCity[i]);
   }
   // console.log(items[0].city)
   console.log(items)
   // _this.USER_USERDATA(items);

   })

  },
    methods:{
         // ...mapMutations([
         //        'USER_USERDATA',
         //    ]),
      hostCity(item){
        this.$emit('citymess', item);
      },
      init () {
        this.rightControlLeftClass();
      },
      rightControlLeftClass () {
      var leftUl = this.$refs.businessLeft;
      var leftLI = leftUl.querySelectorAll('.cityli');
      var rightUl = this.$refs.ullist;  
      var asIndex = 0;
      rightUl.addEventListener('scroll', () => {
        var thisST = rightUl.scrollTop;
        var ti = rightUl.querySelectorAll('.keyStyle');
        for (var i = 0; i < ti.length; i++) {
          if (thisST >= ti[i].offsetTop) {
            asIndex = i;
          }
        };
        for (var j = 0, x = leftLI.length; j < x; j++) {
          leftLI[j].classList.remove('active_ia');
        }
        leftLI[asIndex].classList.add('active_ia');
      }, false);
    },
    leftControlRightScroll (index) {
      var scrollMove = (ele, target) => {
        // console.log(target)
        var vector = Math.round((target - ele.scrollTop) /10);
        // console.log('vector', vector);
        var scrollTimer = setInterval(() => {
          // console.log(vector)
          ele.scrollTop += (vector);
          // ele.scrollTop += homeTitle.offsetHeight;
          // console.log(ele.scrollTop)
          if (((ele.scrollTop >= target) && vector > 0) || ((ele.scrollTop <= target) && vector < 0) || ((ele.scrollTop + ele.clientHeight + 1) >= ele.scrollHeight)) {
            ele.scrollTop = target + 1;
            clearInterval(scrollTimer);
          }
        }, 1000 / 100);
      };
      var rightUl_ = this.$refs.ullist;
      var rightTo_ = rightUl_.querySelectorAll('.keyStyle')[index].offsetTop;
      scrollMove(rightUl_, rightTo_);
     
    }
    }
  }
</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';
.active_ia{
  color:#fff !important;
  background:#70bad1;
}
.search{
  width: 10.0rem;
  height: 0.933rem;
  line-height: 0.933rem;
  margin-top: 0.213rem;
}
.search_add{

}
.search_add{
  margin-left: 1.36rem;
  float:left;
  height: 0.933rem;
  line-height: 0.933rem;
    img{
      width: 0.4rem;
      height: 0.56rem;
    }
    span{
      display: inline-block;
      color: #333;
      font-size: 0.427rem;
      &:before{
        content: '';
        width: 0.4rem;
        height: 0.56rem;
        
        background-size: cover;
        position: absolute;
        top: 0.427rem;
        left: 0.8rem;
      }
    }
} 
.cityall{
    width: 100%;
    overflow-y: auto;
    position:absolute;
    top: 3.733rem;
    padding-top: .2rem;
    bottom: 0;
}
.search_hos{
  width: 6.667rem;
  height: 0.933rem;
  position: relative;
  float: left;
  margin-left: 0.587rem;
  box-sizing:border-box;
  img{
    position: absolute;
    width: 0.507rem;
    height: 0.507rem;
    top: 0.213rem;
    left: 0.267rem;
  }
  input{
    box-sizing:border-box;
    width: 6.667rem;
    height: 0.933rem;
    line-height: 0.933rem;
    font-size: 0.187rem;
    border-radius: 0.933rem;
    border: 1px solid #cdced0;
    outline: none;
    padding-left:0.8rem;
  }
}

.word{
  width: 10.0rem;
  height: 1.333rem;
  position: fixed;  
  // margin-top: 0.533rem;
  margin-bottom: 0.8rem;
  top: 1.873rem;
  // padding-bottom: 20px;
  border-bottom:1px solid rgb(212, 212, 212);
  padding-bottom:0.507rem;
}
.word_select{
  /*width: 345px;*/
  box-sizing: border-box;
  margin-left: 0.3rem;
  height: 0.667rem;
  line-height: 0.667rem;
}
.word_select ul li{
  width:  0.667rem;
  height: 0.614rem;

  line-height: 0.7rem;
  font-size: 0.427rem;
  list-style: none;
  float: left;
  color: #888;
  margin-right: 0.1rem;
  padding-bottom: 0.053rem;
}

.famous_city{
  margin-top: 2.933rem;
}
.famous_city div{
  color: #333;
  font-size: 0.373rem;
  margin: 0.667rem 0 0.427rem 0.4rem;
}
.type_title{
  margin: 0px  0.4rem 0 0.4rem;
}
.type_title div{
  text-align:left;
}
.famous_city ul,.city_select ul{
  margin: 0px 0.4rem 0 0.4rem;
}
.famous_city ul li, .city_select ul li{
  list-style: none;
 
  width: 100%;
  padding-top:0.827rem;
  padding-bottom:0.347rem;  
  font-size: 0.4rem;
  color: #000;
  border-bottom: 1px solid #d4d4d4;
  background:#f3f4f6;
  letter-spacing:0.1em;
  text-align:left;
}
.famous_city p,.city_select p{
  clear: both;
}
.keyStyle{
   padding-top:.8rem;
   font-size: 0.373rem;
   color: #333;
   letter-spacing:0.05em;
}
</style>