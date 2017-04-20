<template>
	<div class="searchhspt" v-show="showMe" :class="{ searchcntent: searchcontent,searchcntent: hostipalcontent  }" >
  <div class="searchname" :class="{ search: cssactive }">
	 <div class="srcimgd" @click="citychange" :class="{search_add : cssactive}"><img src="../../assets/img/location.png" class="imgO" :class="{ searchimg: imgactive }" v-if="!cssactive"/><img src="../../assets/img/locations.png" class="imgO" :class="{ searchimg: imgactive }" v-if="cssactive"/><div>{{localCity}}</div></div>
	 <div class="searchipt borderfor pfxi" :class="{search_hos : cssactive}"><form v-on:submit.prevent="onSubmit(search)" ><input type="text" v-model='search' placeholder="输入医院名称" class="borderfor borderbox"/></form><img src="../../assets/img/search.png" /></div>
  </div>
      <div class="searchhspts" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" ref="ullist" id="changehspl" :class="{ hos_names: cssactive }" v-if="!searchcontent">
      	 <div class="border searchhsptss pfxi" v-for="(item , index) in hospitalList"  @click="hospitalChoose(item)" :class='{"choosecolor" : cell == item.name}' :key="index"><span class="spanospital">{{item.name}}</span><span style="display:none">{{item.cityId}}</span></div>
        <p class=" borderfor pfxi searchmorhs" @click="linkname" v-if="hostipalcontent">添加医院</p>
      </div>
      <div class="searchno" v-if="searchcontent">
      	 <div>暂时找不到医院，请重新筛选</div>
      	 <div class="searchwalue">{{searchnone}}</div>
         <div class=" borderfor pfxi searchmorhs" @click="linkname">添加医院</div>
      </div>
      
	</div>
</template>
<script>
 import api from '../../api/login/login.js'
 import { mapMutations , mapGetters} from 'vuex'
 import { locationCode } from '../../common/js/weixin.js'
  import { getStore } from '../../common/js/test.js'

	export default {
		data(){
			return{
                 hospitalList:[],
                 cell:'',
                 hospitalnames: true,
                 hospitalnamess:true,
                 citynames:false,
                 citynamess:false,
                 localCity:"上海",
                 search: '',
                 pageNums:0,
                 localId:null,
                 busy: false,
                 citySearch:false,
                 contentNext:"输入医院名称",
                 focusStatus:false,
                 contents: true,
                 hostipalcontent:false,
                 citysearchname:false,
                 citychangename:[],
                 isActive:true,
                 isnumber:true,
                 searchcontent: false,
                 searchnone:null,
                 cssactive:false,
                 searchTop:null,
                 showMe:false,
                 imgactive:false
			}

		},
    watch:{
      $route(){
        this.cssactive = false;
        if(this.usercity != ""){
          var _this =this;
          console.log(_this.l_thisocalCity != _this.usercity.ci)
          if(_this.localCity != _this.usercity.ci){
            _this.localCity = _this.usercity.ci
            _this.localId = _this.usercity.ids
            _this.hospitalList= [];
            _this.searchHistop();
          } 
        }
        this.search = null;
      },
    showMe: function (value) { 
      if (value) {
        this.$nextTick(() => {
          this.start();
        });
      }
    }
    },
		beforeCreate(){
           this.isActive = true;
		},
		created(){
			document.title="所在医院";
		if(getStore("locationcity") == null || getStore("locationcity") == "" ){
			this.localCity = "上海";
			this.localId = 3;
		}else{
           this.localCity = getStore("locationcity");
          this.localId = getStore("locationid");
		}
               
		},
    mounted(){
          this.showMe= true; 
    },
        computed:{
			...mapGetters({
		        dataitems:'dataitems',
            usercity:'usercity'
      		})
		},
       directives: {
    focus: {
        inserted: function (el, {value}) {
            if (value) {
                el.focus();
            }
        }
    }
},
		// components:{
		//   'citychange':citychange
		// },
		methods:{

			  ...mapMutations([
                'USER_HOSPITAL',
                'USER_CITYALL'
        ]),
        start(){
           var rightUl = this.$refs.ullist; 
        rightUl.addEventListener('scroll', () => {
        var thisST = rightUl.scrollTop;
          this.cssactive = true;
      }, false);
        },
        linkname(){
                this.$router.push("/addhspt")
              },
        foucesearch(){
              this.focusStatus = true;
              this.contents = false;
            },
        hospitalChoose(items){
                this.cell = items.name;
                this.USER_HOSPITAL(items);
                this.$router.push("/inft")
            },
        citychange(){
                  this.imgactive = true;
                  this.USER_CITYALL("search")
                  this.$router.push("/citychg")
            },
        changeCity(){
               
            },
        citynamecheck(event,id){
     
            },
        cityMessage(text){
              
            },
        loadMore(){
            	 const _this = this;
            	 _this.busy = true;
               _this.searchConten();
               _this.busy = false;
            },
        searchConten(){
           var _this = this;
           if(_this.search != ""){
            if(_this.hostipalcontent == false){
              _this.pageNums++;
              _this.searchName();
            }
           }else{
            if(_this.hostipalcontent == false){
             if(_this.isnumber){
               _this.pageNums = 1;
               _this.isnumber = false;
             }else{
               _this.pageNums++;
             }
             _this.searchHistop();
           }
          }
        },
        searchHistop(){
          var _this = this;
          api.searchHospital("pageSize=25&pageNum="+ _this.pageNums+"&cityId="+_this.localId).then(function(json){
              console.log(json.data.data.list.length)
            if(json.data.data.list.length <= 0){
               _this.hostipalcontent = true;
            //   if(_this.pageNums == 1){
            // _this.searchnone = _this.search;
            //   _this.searchcontent = true;
            //   }
            }else{
                _this.hostipalcontent = false;
                _this.hostipalcontent = false;
                for(var i = 0 ; i < json.data.data.list.length;i++){
                  var hosptal = {};
                         hosptal.name=json.data.data.list[i].name;
                         hosptal.cityId  = json.data.data.list[i].cityId;
                        _this.hospitalList.push(hosptal)
                       }
                  // if(json.data.data.list.length <= 25){
                  //     _this.hostipalcontent = true;
                  // }
                }
          })
        },
        searchName(){
          var _this = this;
            api.searchHospital("pageSize=25&pageNum="+ _this.pageNums+"&name="+_this.search+"&cityId="+_this.localId).then(function(json){

              console.log(json.data.data.list.length)
            if(json.data.data.list.length <= 0){
              
              _this.hostipalcontent = true;
              if(_this.pageNums == 1){
                _this.searchnone = _this.search;
              _this.searchcontent = true;
              }
              // _this.searchnone = _this.search;
              // _this.hostipalcontent = true;
            }else{
                _this.hostipalcontent = false;
                _this.searchcontent = false;
                for(var i = 0 ; i < json.data.data.list.length;i++){
                  var hosptal = {};
                         hosptal.name=json.data.data.list[i].name;
                         hosptal.cityId  = json.data.data.list[i].cityId;
                        _this.hospitalList.push(hosptal)
                       }
                  if(json.data.data.list.length <= 25){
                      _this.hostipalcontent = true;
                  }
                }
              })
            },
        onSubmit(item){
            if(this.search != ""){
               this.hospitalList = [];
               this.pageNums = 1;
               this.searchName();
            }
		    }
		}
	}
</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';

	.searchhspt{
        	position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    background:#f3f4f6;
        height: 100%;
	}
	.srcimgd{
		text-align:center;
		 margin-top:1.627rem;
		 img{
		  	width:1.333rem;
		 	 margin-bottom:0.453rem;
		 }
     div{
      color:#000;
      font-family: PingFangSC-Light !important;
     }
		 font-size:0.533rem;
		 margin-bottom:1.467rem;
	}
	.searchipt{
	   width: 7.667rem;
	   margin:o auto;
	   position:relative;
	 border:1px solid #d4d4d4;
	height:1.067rem;
	margin:0 auto;
	line-height:1.067rem;
	font-size:0.427rem;
	color:#434a54;
    input{
    	position:absolute;
      font-family: PingFangSC-Light !important;
    	top:0px;
    	left:0px;
    	width:100%;
    	height:100%;
    	 padding-left: 1.04rem;
    }
	   img{
         position:absolute;
         left:0.267rem;
         width:0.507rem;
         top:0.26rem;
	   }
	}
	.searchhspts{
		width:90%;
		margin:0 auto;
		overflow:auto;
    text-overflow: ellipsis;
    white-space: nowrap;
		height:9rem;
		div{
			font-size:0.427rem; 
		}
	}
	.searchhsptss{
	   position:relative;
	   border-bottom:1px solid #d4d4d4;
     padding-top:0.98rem;
     padding-bottom:0.447rem;
     color:#333;
     height: .6rem;
     line-height: .6rem;
	}
	.searchmorhs{
		border:1px solid #d4d4d4;
    margin-bottom:1.333rem !important;
    margin-top:1.067rem !important;
		width:4.0rem;
    font-size:0.427rem;
		margin:0 auto;
		text-align:center;
		line-height:1.067rem;
		height:1.067rem;
    color:#434a54 !important;
	}
  .searchno div{
    color:#333;
    font-size:0.427rem;
    font-family: PingFangSC-Light !important;
  }
	.searchno{

		text-align: center;
		margin-top:2.267rem;
		text-align:center;
		font-size:0.4rem;
		div:nth-child(2){
			margin-top:0.4rem;
		}
	}


.searchcntent{
  height:100%;
}
.searchname{
  height:5.5rem;
  position:relative;
}

.search_add{
  float:left;
  position:relative;
  animation:mytop 0s 1;
-webkit-animation:mytop 0s 1;
animation-fill-mode:forwards; 
-webkit-animation-fill-mode:forwards; 
}
.search_add div{
  display:inline-block;
}
.search{
    position: fixed;
    padding-top: 0.267rem;
background:#f3f4f6;
    width: 100%;
    z-index:1000;
animation:mymove 0s 1;
-webkit-animation:mymove 0s 1;
animation-fill-mode:forwards; 
-webkit-animation-fill-mode:forwards; 


}
.hos_names{
  width:100%;
  margin: 0 auto;
  height:16rem;
  overflow:auto;
  background:#f3f4f6;
  box-sizing: border-box;
  box-sizing:border-box;
  -moz-box-sizing:border-box;
  -webkit-box-sizing:border-box;
  padding:0px 0.5rem;
  padding-top:1.5rem;
  z-index:1000;
}
.hos_names div{
  width: 100%;
  height: 0.933rem;
  line-height: 0.933rem;
  font-size: 0.427rem;
  color: #000;
  padding: 0.96rem 0 0.507rem 0;
  position: relative;

}
.spanospital{
  width:90%;
  display:inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-family: PingFangSC-Light !important;
}
.searchwalue{
  color:#000 !important;
}
.search_add img{
  position: absolute;
    left: -0.8rem;
    top: 0px;
    height: .8rem;
  animation:myimg 0s 1;
-webkit-animation:myimg 0s 1;
  animation-fill-mode:forwards; 
-webkit-animation-fill-mode:forwards; 
}
.search_add div{
  display:inline-block;
}
.search_hos{
  float:left;

animation:myinput 0.4s 1;
-webkit-animation:myinput 0.4s 1;
  animation-fill-mode:forwards; 
-webkit-animation-fill-mode:forwards; 
}
.search_hos img{
  width: 0.7rem;
  top: 0.1rem;
}
.search_hos input{
   padding-left:1.1rem;
}
.searchcontents{
  animation:myinput 0s 1;
-webkit-animation:myinput 0s 1;
  animation-fill-mode:forwards; 
-webkit-animation-fill-mode:forwards; 
}
@keyframes mytop
{
from {margin-top:1.627rem;margin-bottom:1.467rem;height:0px;line-height:0px;margin-left:0px;}
to {margin-top:0px;margin-bottom:0px;height:0.933rem;line-height:.933rem;margin-left:1.36rem;}
}

@-webkit-keyframes mytop
{
from {margin-top:1.627rem;margin-bottom:1.467rem;height:0px;line-height:0px;margin-left:0px;}
to {margin-top:0px;margin-bottom:0px;height:0.933rem;line-height:.933rem;margin-left:1.36rem;}
}
@keyframes mymove
{
from {height:5.5rem;}
to {height:0.933rem;line-height:0.933rem;}
}

@-webkit-keyframes mymove
{
from {height:5.5rem;}
to {height:0.933rem;line-height:0.933rem;}
}
@keyframes myimg
{
from {width:1.333rem;}
to {width:.6rem;}
}

@-webkit-keyframes myimg
{
from {width:1.333rem;}
to {width:.6rem;}
}
@keyframes myinput
{
from {width:7.667rem;margin-left:0px;margin-bottom:1.093rem;height:1.067rem;line-height:1.067rem;}
to {width:6.667rem;margin-left: 0.627rem;margin-bottom:0px;height:0.933rem;line-height:0.933rem;}
}

@-webkit-keyframes myinput
{
from {width:7.667rem;margin-left:0px;margin-bottom:1.093rem;height:1.067rem;line-height:1.067rem;}
to {width:6.667rem;margin-left: 0.627rem;margin-bottom:0px;height:0.933rem;line-height:0.933rem;}
}
.searchimg{
  opacity:.6;
}
.search_add div{
      display: inline-block;
    width: 0.933rem;
    color: #333;
    font-size: 0.427rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>