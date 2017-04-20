<template>
	<div class="hospitallist">
	    <div class="search">
			<div class="search_add">
			   <img src="../../assets/img/locations.png" :class="{ searchimg: imgactive }"/>
				<span class="pfxi">{{localCity}}</span><span style="display:none">{{localId}}</span>
			</div>
			<div class="search_hos">
				<form v-on:submit.prevent="onSubmit(search)" ><input type="text" v-model='search' placeholder="输入城市名称" /></form>
			    <img src="../../assets/img/search.png" /> <!-- <span class="cityContent" v-if="contents">{{contentNext}}</span> -->
			</div>
		</div>
		<citychange v-on:citymess="cityMessage" v-if="cityall"></citychange>
		<div class="citysearchs">
		<ul v-if="citysearch">
			<li v-for="item in items" class="border pfxi" @click="citysearchclick({ci:item.city , ids: item.id})"><span>{{item.city}}</span><span style="display:none">{{item.id}}</span></li>
		</ul>
		</div>
	</div>
</template>
<script>
 import citychange from './citychange.vue'
 import { mapMutations , mapGetters} from 'vuex'
import api from "../../api/login/login.js"
	export default {
		data(){
			return{
                 localCity:"上海",
                 search: '',
                 localId:null,
                 cityall:true,
                 citysearch:false,
                 items:[],
                 imgactive:false
			}
		},
		created(){
           document.title="所在医院";
		},
		components:{
		  'citychange':citychange
		},
        computed:{
			...mapGetters({
            usercity:'usercity',
            usercityall:'usercityall'
      		})
		},
		watch:{
			$route(){
               this.cityall = true;
               this.citysearch = false;
               this.search = null;
               if(this.usercity != ""){
                  this.localCity = this.usercity.ci;
               }            
			}
		},
		methods:{

			...mapMutations([
                'USER_CONTENT',
                'USER_ADDCITY'
                  ]),
             cityMessage(text){
                this.localCity = text.ci;
                this.localId = text.ids;
               
                console.log(this.usercityall == "addhospital")
                if(this.usercityall == "addhospital"){
                   this.USER_ADDCITY(text)
                   this.$router.push("/addhspt")
                }else{
                	this.USER_CONTENT(text)
                	this.$router.push("/search")
                }
                // this.$router.push("/search")
            },
            onSubmit(item){
                var _this = this;

                if(_this.search != ""){
                 _this.cityall = false;
                 _this.citysearch = true;
                 // var items = _this.dataitems;
                 api.searchCitys(_this.search).then(function(json){
                 	console.log(json.data.data)
                 	_this.items = json.data.data;
                 })
                }
		    },
		    citysearchclick(item){
		        this.USER_CONTENT(item)
		        if(this.usercityall == "addhospital"){
		           this.USER_ADDCITY(item)
                   this.$router.push("/addhspt")
                }else{
                	this.USER_CONTENT(item)
                	this.$router.push("/search")
                }
		    }
		}
	}
</script>
<style  lang="less" scoped>
.hospitallist{
	  	text-align: center;
  	position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
     background:#f3f4f6;
}
.citysearchs{
	position:absolute;
	top: 1.873rem;
    width:100%;
    ul{
        width: 8.68rem;
        margin: 0 auto;
        li{
            list-style: none;
    width: 100%;
    padding-top: 0.827rem;
    padding-bottom: 0.347rem;
    font-size: 0.4rem;
    color: #000;
    border-bottom: 1px solid #d4d4d4;
    background: #f3f4f6;
    letter-spacing: 0.1em;
    text-align: left;
        }
    }
}
.search{
    width: 100%;
    height: 0.933rem;
    line-height: 0.933rem;
    position: fixed;
    padding-top: 0.267rem;
    z-index: 100;
    background: #f3f4f6;
}
.search_add{
	float:left;
	height: 0.933rem;
	line-height: 0.933rem;
	margin-left: 1.36rem;
	position:relative;
	img{
		position:absolute;
		left:-.8rem;
		height:.8rem;
	}

}

.search_add span{
	display: inline-block;
	width: 0.933rem;
	color: #333;
	font-size: 0.427rem;
	white-space:nowrap;
	overflow:hidden;
	text-overflow:ellipsis;

}
.search_add span:before{
	content: '';
	
	background-size: cover;
	position: absolute;
	top: 0.4rem;
	left: 0.8rem;
	
	width: 0.4rem;
	height: 0.56rem;
}
.search_hos{
	width: 6.667rem;
	height: 0.933rem;
	position: relative;
	float: left;
	margin-left: 0.627rem;
	box-sizing:border-box;
}
.search_hos img{
	position: absolute;
	width: 0.507rem;
	height: 0.507rem;
	top: 0.213rem;
	left: 0.267rem;
}
.search_hos input{
	box-sizing:border-box;
	width: 6.667rem;
	height: 0.933rem;

	border-radius: 0.933rem;
	border: 1px solid #cdced0;
	outline: none;
	padding-left:0.867rem;
	font-size: 0.373rem;
	color: #333;
	background: #f3f4f6;
	font-family: PingFangSC-Light;
}
.searchimg{
	opacity:.6;
}
</style>