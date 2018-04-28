<template>
  <div id="home">
     <div class="audioTitle">这是音乐的头部</div>
     <div class="contentList">
       <div class="listContent" @click="routerList('1')">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513169817306&di=5a0038169eed075b554e8623e905ad38&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F16%2F42%2F96%2F56e58PICAu9_1024.jpg"/>
          <p>aaaaa</p>
       </div>
     </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      dd: 'daa'
    }
  },
  computed: {
    data () {}
  },
  methods: {
    routerList (id) {
      this.$router.push({path: 'list', query: {id: id}})
    }
  },
  beforeMount () {},
  mounted () {
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

 #home {
   margin: 0 auto;
   text-align: center;
 }
 .audioTitle{
  margin: px2Rem(42px) 0 ;
 }
 .contentList{
  padding: 0 px2Rem(42px);
  img {
    width:100%;
  }
 }
 .listContent{
   position: relative;
   margin-bottom: 40px;
   p{
     position:absolute;
     top:50%;
     left: 50%;
     bottom: 50%;
     right: 50%;
   }
 }
</style>
