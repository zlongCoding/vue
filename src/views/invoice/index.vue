<template>
  <div class="invoice">
    <div class="inner">
        <div class="person-info">
          <div>
            <p>收件人</p>
            <p>财务001</p>
          </div>
          <div>
            <p>收件地址</p>
            <p>上海市静安区长寿路111号30楼 </p>
          </div>
          <div>
            <p>电话</p>
            <p>021-22206823</p>
          </div>
      </div>
      <div class="invoice-info">
          <div>
            <p>发票金额</p>
            <p v-html="diffSizeAmount(this.$route.query.totalAmount, '￥')"></p>
          </div>
          <div>
            <p>发票内容</p>
            <p>服务费</p>
          </div>
          <div>
            <p>公司名称</p>
            <p>上海赢科信息技术有限公司</p>
          </div>
          <div>
            <p>纳税人识别号</p>
            <p>91310106MA1FY4XJ4G</p>
          </div>
          <div>
            <p>开户行</p>
            <p>中国工商银行上海市曹家渡支行</p>
          </div>
          <div>
            <p>账号</p>
            <p>1001261809207931559</p>
          </div>
          <div>
            <p>地址</p>
            <p>上海市静安区万荣路1256/1258号1621室</p>
          </div>
          <div>
            <p>电话</p>
            <p>021-22206858</p>
          </div>
      </div>
      <div class="eq">
        <div></div>
      </div>
      <input type="button" value="返回" @click="goBack()">
    </div>
   
  </div>
</template>

<script>
  import utils from '@/utils'
  export default {
    name: 'invoice',
    data () {
      return {
      }
    },
    components: {
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      }
    },
    beforeMount () {
      utils.setDocTitle(`发票信息`)
    },
    mounted () {
      document.querySelector('html').style.height = '100%'
      document.querySelector('#app').style.height = '100%'
    },
    destroyed () {
      document.querySelector('html').style.height = 'auto'
      document.querySelector('#app').style.height = 'auto'
    }
  }
</script>

<style scoped lang="sass">
@import "../../assets/style/invoice/index.scss"
</style>
