<template>
  <div class="hello">
    <div v-for='item in showList'>{{item}}</div>
    <div @click="showAll = !showAll" class="show-more">{{word}}</div>
  </div>
</template>

<script>
  export default {
    name: 'UnfoldingFold',
    data () {
      return {
        toLearnList:[
        'html','css','javascript','java','php'   //进行显示的数据
    ],
      showAll:false  　　　　　　　　　　　　　　　　//标记数据是否需要完全显示的属性
    }
    },
    computed:{
      showList:function(){
        if(this.showAll == false){                    //当数据不需要完全显示的时候
          var showList = [];　　　　　　　　　　　　　　　 //定义一个空数组
          if(this.toLearnList.length > 3){　　　　　　　//这里我们先显示前三个
            for(var i=0;i<3;i++){
              showList.push(this.toLearnList[i])
            }
          }else{
            showList = this.toLearnList
          }
          return showList;　　　　　　　　　　　　　　　　 //返回当前数组
        }else{
          return this.toLearnList;
        }
      },
      word:function(){
        if(this.showAll == false){　　　　　　　　　　　//对文字进行处理
          return '展开全部'
        }else{
          return '收起'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../css/rosterSelectSite.css";
</style>
