<template>
<div class="phoneReg">
	<div class="info_write">
	    <header>添加医院</header>
	    <div class="titlename">谢谢帮忙！上线成功后会通知你</div>	
	    <div>
	    <div class="infoStyle border inputname">
			<input type="text" class=" pfxianxi paddingfor"  v-model="hospitalname"  v-on:focus="chenkClass" placeholder="医院名称" :class="{inputimg : inputimgs}"/>
		</div>
	     <div class="infoStyle border paddingfor"  @click="homeSelect">
			
			<span class="inforspan pfxianxi">{{cityname}}</span> 
			<span class="infspan"><i class="right-arrow1"></i><i class="right-arrow2"></i></span>
		</div>
	    <div class="infoStyle border inputname">
			<input type="text" class=" pfxianxi paddingfor"  v-model="homename"  v-on:focus="chenkClass" placeholder="详细地址" :class="{inputimg : inputimgss}" />
		</div>
	    </div>
	    <div class="showMsg" :class="{ errorMsg: isStyleFalse}">{{errMsg}}</div>
	    <div class="hospitals" @click="sublims">提交</div>
	</div>
	</div>
</template>
<script>
import { mapMutations , mapGetters} from 'vuex'
import api from '../../api/login/login.js'
  import { chinese } from '../../common/js/test.js'

	export default {
	   data (){
           return {
                 hospitalname:null,
                 homename:null,
                 cityname:"所在城市",
                 cityid:null,
                 isStyleFalse:false,
                 errMsg:null,
                 inputimgs:false,
                 inputimgss:false,
                 userIds:null
           }
	   },
	   created(){
            document.title="添加医院";
            var id =JSON.parse(userAll)
             this.userIds=id.id
		},
	   watch:{
			$route (){
				var _this = this;
				if(_this.useraddcity == ""){
					_this.cityname= "所在城市";
				}else{
			       _this.cityid=_this.useraddcity.ids
                   _this.cityname = _this.useraddcity.ci
				}
       		},
		},
	   computed:{
			...mapGetters({
		        usercity:'usercity',
		        useraddcity:'useraddcity'
		    })
		},
	   methods:{
	    	...mapMutations([
                'USER_CITYALL',
                'USER_HOSPITAL'
            ]),
            cityMessage(text){
                this.localCity = text.ci;
                this.localId = text.ids;

            },
            chenkClass(){
                   this.isStyleFalse = false;
                   this.inputimgs = false;
                   this.inputimgss = false;
            },
          sublims(){
          	 var _this = this;
          	 if(_this.hospitalname !=null && _this.hospitalname !="" && _this.homename != null && _this.homename != "" && _this.cityname !="所在城市" && chinese.test(_this.hospitalname)){
               var data = {
                         "userId": _this.userIds,
                         "cityId": _this.cityid,
                         "name": _this.hospitalname,
                         "address":  _this.homename,
                         "type": "1"
                 }                       
           api.saveHospital(data).then(function(json){
                if(json.data.error){
              	 _this.isStyleFalse= true;
              }else{
              var data = {
              	name:json.data.data.address,
              	cityId:json.data.data.id
              }
    
              _this.USER_HOSPITAL(data)
              _this.$router.push("/inft")
              }
            })
          	 	
          	 }else{
          	    _this.errMsg="";
               if(chinese.test(_this.hospitalname) == false){
              	 	_this.isStyleFalse= true
                  _this.inputimgs = true;
                  _this.errMsg = "医院填写错误";
              	}else if(_this.hospitalname == null ){
                  _this.inputimgs = true;
              	 	_this.isStyleFalse= true;
                  _this.errMsg = "医院填写错误";
              	 }else if(_this.homename == null || _this.homename == "" ){
					           _this.isStyleFalse= true
                     _this.inputimgss = true
                     _this.errMsg = "地址填写错误";
              	 }else if(_this.cityname == null || _this.cityname =="所在城市"){
					           _this.isStyleFalse= true;
                     _this.errMsg = "所在城市填写错误";
              	 }
          	 }
          },
          homeSelect(){
          	this.isStyleFalse= false;
            this.inputimgs = false;
            this.inputimgss = false;
          	this.USER_CITYALL("addhospital")
          	this.$router.push('/citychg')
          }
	   }
	}
</script>
<style scoped lang="less">
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
	.hospitals{
		margin:0 auto;
			margin-top:3.827rem;
			    width: 3.333rem;
    height: 1.067rem;
    line-height: 1.067rem;
    text-align: center;
    display: block;
    
    border-radius: 0.933rem;
    font-size: 0.427rem;
    color: #fff;
    outline: none;
      width:7.667rem;
  border:1px solid #d4d4d4;
  height:1.067rem;
 
  line-height:1.067rem;
  margin-bottom:1.307rem;
  font-size:0.427rem;
  color:#434a54;
		}
		.infoStyle{
		width:100%;
		position: relative;
		font-size: 0.427rem;
		height: 1.493rem;
		padding-top: 0.353rem;
		// padding: 0.987rem 0 0.533rem;
		span{
			color: #434a54;
		font-family: PingFangSC-Light;
		}
	
		input{
			background:#f3f4f6;
			outline:none;
			letter-spacing: 0.05em;
			line-height: 1.493rem;
			width: 100%;
		}
		img{
			width: 0.24rem;
			height: 0.48rem;
			float: right;
			margin-right: 0.267rem;
			margin-top: 0.533rem;
		}
	}
.infoStyle input:-moz-placeholder { 
    color: #434a54;  
    font-family: PingFangSC-Light;
}

.infoStyle input::-moz-placeholder { 
    color: #434a54;  
    font-family: PingFangSC-Light;
}

.infoStyle input:-ms-input-placeholder{
    color: #434a54;  
    font-family: PingFangSC-Light;
}

.infoStyle input::-webkit-input-placeholder{
    color: #434a54;  
    font-family: PingFangSC-Light;
}
.pfxianxi{
	font-size:0.427rem;
   color: #434a54;
	font-family:PingFangSC-Light;
}
	.border:after {
	    height: 1px;
	    content: '';
	    width: 100%;
	    border-top: 1px solid #cdced0;
	    position: absolute;
	    bottom: -1px;
	    right: 0;
	    transform: scaleY(0.5);
	    -webkit-transform: scaleY(0.5);
    }
    	.info_write{
		width: 7.667rem;
		position:absolute;
		box-sizing: border-box;
		// margin: 0.667rem auto 0;
		padding-top: 1.44rem;
		top: 0px;
    left: 50%;
    margin-left: -3.835rem;
		header{
			font-size:0.427rem;
			color:#000;
			font-family:PingFangSC-Light;
			margin-bottom:0.36rem;
			text-align:center;
		}
		.titlename{
			font-size:0.4rem;
			font-family:PingFangSC-Thin;
			margin-bottom:0.8rem;
			text-align:center;
			color:#333;
		}
	}
	.info_write div{
		letter-spacing: 0.08em;
	}
	.inforspan{
	display: inline-block;
    width: 100%;
    line-height: 1.493rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align:left;
}

.showMsg{
		height: 0.4rem;
		line-height: 0.4rem;
		margin-top: 0.333rem;
		letter-spacing: 0.02em;
		color: #e63838;
		opacity: 0;
}
.errorMsg{
	opacity: 1;
}
  .infspan{
    position:absolute;
    right:  0.5rem;
    top:0.7465rem;
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
  .inputimg{
    color:#e63838;
  }
</style>