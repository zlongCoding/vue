<template>
  <div id="DeviceList" class="deviceList">
    <div :class="'list'">
      <div class="hard"></div>
      <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
        <ul>
          <li class="deviceList-li" v-for="item in listdata"  v-bind:id="item.id">
            <a @click="goRoute(item.id)">
              <span class="deviceList-li-le">
                <img v-bind:src="item.icon" />
              </span>
              <span class="deviceList-li-re">
                <p>设备名称：<i>{{item.assetName}}</i></p>
                <p>设备编号：<i>{{item.assetCode}}</i></p>
              </span>
            </a>
          </li>
          <li class="deviceList-li" v-for="item in downdata"  v-bind:id="item.id">
            <a @click="goRoute(item.id)">
              <span class="deviceList-li-le">
                <img v-bind:src="item.icon" />
              </span>
              <span class="deviceList-li-re">
                <p>设备名称：<i>{{item.assetName}}</i></p>
                <p>设备编号：<i>{{item.assetCode}}</i></p>
              </span>
            </a>
          </li>
        </ul>
      </v-scroll>
    </div>
    <v-scan @click="scanClick()"></v-scan>
  </div>
</template>

<script>
  import Scan from './scan.vue';
  import Scroll from './scroll.vue';
  export default {
    name: 'DeviceList',
    data(){
      console.log("---------",this.$route.params); //上一页带过来的参数
      return {
        counter : 1, // 默认已经显示出10条数据 count等于一是让从11条开始加载
        num : 10,  // 一次显示多少条
        pageStart : 0, // 开始页数
        pageEnd : 0, // 结束页数
        listdata: [], // 下拉更新数据存放数组
        downdata: []  // 上拉更多的数据存放数组
      }
    },
    /*created (){
      this.$http.get('/static/deviceList.json',{
          params: {
            productType:"1",
            pageNum:1,
            pageLimit:8
          }
        })
        .then(
          function(response){
            this.listdata =response.data.data.result;
            //this.$set(this.listdata,response.data.data.result);
            console.log(this.listdata);
          },
          function(response){
            console.log(response);
          }
        )
    },*/
    /*methods: {
      goRoute: function(e) {
        this.$router.push({
          name: 'Devicedetails',
          params:{id:e}
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
      this.getList();
      this.setTitle('已登记设备')
    },
    components : {
      'v-scroll': Scroll
    }*/
    mounted : function(){
      this.getList();
      this.setTitle('已登记设备')
    },
    methods: {
      getList(){
        let vm = this;
        vm.$http.get('/static/deviceList.json',{
          params: {
            productType:"1",
            pageNum:1,
            pageLimit:8
          }
        }).then(function(response){
          vm.listdata = response.data.data.result.slice(0,10);
      }, function(response){
          console.log('error');
        });
      },
      onRefresh(done) {
        this.getList();
        done() // call done
      },
      onInfinite(done) {
        let vm = this;
        vm.$http.get('/static/deviceList.json',{
          params: {
            productType:"1",
            pageNum:1,
            pageLimit:8
          }
        }).then(function(response){
          vm.counter++;
        vm.pageEnd = vm.num * vm.counter;
        vm.pageStart = vm.pageEnd - vm.num;
        let arr = response.data.data.result;
        let i = vm.pageStart;
        let end = vm.pageEnd;
        for(; i<end; i++){
          let obj ={};
          obj["id"] = arr[i].id;
          obj["icon"] = arr[i].icon;
          obj["assetName"] = arr[i].assetName;
          obj["assetCode"] = arr[i].assetCode;
          vm.downdata.push(obj);
          if((i + 1) >= response.data.data.result.length){
            this.$el.querySelector('.load-more').style.display = 'none';
            return;
          }
        }
        done() // call done
      }, function(response){
          console.log('error');
        });
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
      },
      goRoute: function(e) {
        this.$router.push({
          name: 'Devicedetails',
          params:{id:e}
        })
      }
    },
    components : {
      'v-scan': Scan,
      'v-scroll': Scroll
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this components only -->
<style scoped>
  @import "../css/deviceList.css";
</style>
