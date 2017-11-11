<template>
  <div id="allmap">
  </div>
</template>

<script>
  import $ from '@/utils'
  export default {
    name: 'insurancedetail',
    data () {
      return {
        ctpStart: true,
        bizStart: true,
        colorFail: 'PICC',
        content: '',
        ctpActualAll: null,
        address: null
      }
    },
    beforeCreate () {
    },
    methods: {
    },
    beforeMount () {
      $.setDocTitle(`经销商信息`)
    },
    mounted () {
      var map = new window.BMap.Map('allmap')
      this.address = this.$store.state.businessList.address
      console.log(this.address)
      // this.address = '上海市静安区万航渡路'
      map.centerAndZoom(this.address, 15)
      // var dataInfo = [[116.417854, 39.921988, '地址：北京市东城区王府井大街88号乐天银泰百货八层'],
      //   [116.406605, 39.921585, '地址：北京市东城区东华门大街'],
      //   [116.412222, 39.912345, '地址：北京市东城区正义路甲5号']
      // ]
      var dataInfo = []
      var opts = {
        width: 250,
        height: 80,
        title: '信息窗口',
        enableMessage: true
      }
      for (var i = 0; i < dataInfo.length; i++) {
        var marker = new window.BMap.Marker(new window.BMap.Point(dataInfo[i][0], dataInfo[i][1]))
        var content = dataInfo[i][2]
        map.addOverlay(marker)
        addClickHandler(content, marker)
      }
      function addClickHandler(content, marker) {
        marker.addEventListener('click', function (e) {
          openInfo(content, e)
        })
      }
      function openInfo(content, e) {
        var p = e.target
        var point = new window.BMap.Point(p.getPosition().lng, p.getPosition().lat)
        var infoWindow = new window.BMap.InfoWindow(content, opts)
        map.openInfoWindow(infoWindow, point)
      }
    },
    destroyed () {
    }
  }

</script>

<style scoped lang="scss">
  #allmap{
  	width: 100%;
  	height:100%;
  	background: red;
  	position: fixed !important;
  }
</style>
