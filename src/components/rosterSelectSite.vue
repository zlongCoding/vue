<template>
  <div id="rosterSelectSite" class="rosterSelectSite">
    <div :class="'list'">
      <ul>
        <li v-for="item in items"   @click="returnHome" v-bind:id="item.id">
          <a>
            <p>{{item.subprojectName}}</p>
          </a>
        </li>
      </ul>
    </div>
    <v-scan @click="scanClick()"></v-scan>
  </div>
</template>

<script>
  import Scan from './scan.vue';
  export default {
    name: 'RosterSelectSite',
    data(){
      console.log("---------",this.$route);
      return {
        title:"请选择工地",
        items:[]
      }
    },
    created (){
      this.$http.get('/static/rosterselectsite.json',{
          params: {
            productType:"1",
            pageNum:1,
            pageLimit:8
          }
        })
        .then(
          function(response){
            console.log(response);
            this.items =response.data.data;
            //this.$set(this.items,response.data.data);
            console.log(this.items);
          },
          function(response){
            console.log(response);
          }
        )
    },
    methods: {
      returnHome: function(e) {

        this.$router.push({
          path: '/Home',
          id:e
        })
      },
      setTitle : function(t) {
        console.log(t);
        document.title = t;
        var i = document.createElement('iframe');
        i.src = '//m.baidu.com/favicon.ico';
        i.style.display = 'none';
        i.onload = function() {
          setTimeout(function(){
            i.remove();
          }, 9)
        }
        document.body.appendChild(i);
      }
    },
    mounted(){
      this.setTitle('选择工地')
    },
    components:{
      'v-scan': Scan
//      calendar: require('./calendar.vue')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../css/rosterSelectSite.css";
</style>
