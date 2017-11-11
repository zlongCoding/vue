<template>
  <section id="selectDealer">
    <ul class="dealer-message">
      <li v-for="(data,index) in addressData.delivery">
        <div>
          <u>{{data.name}}</u>
          <span class="message-phone">{{data.mobile}}</span>
          <span class="checkout-span" @click="clickAddress(index)"
                :class=" acqAddress == index ? 'checkout' : 'checkbox-core'  "></span>
          <input type="checkbox"/>
        </div>
        <div class="address">{{data.provinceName}}  {{data.cityName}} {{data.townName}}<span>{{data.details}}</span>
        </div>
      </li>
    </ul>
    <div class="cellList">
      <ul>
        <li v-if="this.addressData.delivery && this.addressData.delivery.length > 0">
          <b>使用新收件信息</b>
          <div class="inputWrap checkbox-input">
            <span class="checkout-span" @click="clickAddress('selectAddredd')"
                  :class="selectAddredd ? 'checkout' : 'checkbox-core' "></span>
            <input type="checkbox"/>
          </div>
        </li>
        <li>
          <b>收单人姓名</b>
          <div class="inputWrap">
            <input type="text" placeholder="请输入姓名" v-model="Req.name" :disabled="isDisabled"/>
          </div>
        </li>
        <li>
          <b>收单人电话</b>
          <div class="inputWrap">
            <input type="tel" placeholder="请输入手机号码" v-model="Req.mobile" :disabled="isDisabled"/>
          </div>
        </li>
        <li>
          <b>收单地址</b>
          <div class="inputWrap" @click="addressClick">
            <div class="reqAddress">
              <span :class="{'color-black': !isDisabled}">{{Req.province}}</span>
              <span :class="{'color-black': !isDisabled}" @click="toogleCity(Req.city)">{{Req.city}}</span>
              <i class="cell-allow-right"></i>
            </div>
          </div>
        </li>
      </ul>
      <div class="textarea">
        <textarea placeholder="请输入详细地址" v-model="addAddress" :disabled="isDisabled"></textarea>
        <span class="number-span"><span>{{count}}/</span>100</span>
      </div>
      <section class="reminder">根据保险公司规定，可选择的配送地址范围可能受当前投保地区影响而被限制</section>
    </div>
    <button class="btn" @click="submitTrue">确认无误提交</button>
    <mt-popup v-model="showCity" position="bottom">
      <mt-picker :slots="citySlots" @change="oncityChange" value-key="key" :showToolbar="true" :visibleItemCount='3'>
        <span class="mint-datetime-action mint-datetime-cancel" @click="toogleCity()">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="selectCity()">确定</span>
        <div class="picker-toolbar-hr"></div>
      </mt-picker>
    </mt-popup>
  </section>
</template>

<script>
  import $ from '@/utils'
  import Mint from 'mint-ui'

  export default {
    name: 'phoneList',
    data () {
      return {
        acqAddress: null,
        selectAddredd: false,
        count: 0,
        noAdd: null,
        detailAddress: '',
        isDisabled: true,
        addAddress: null,
        showCity: false,
        cityTemp: {
          key: '',
          value: ''
        }
      }
    },
    computed: {
      Options () {
        return this.$store.state.selectAddress.Options
      },
      Req () {
        return this.$store.state.selectAddress.Req
      },
      addressData () {
        return this.$store.state.Confirm.address
      },
      citySlots () {
        return this.$store.state.selectAddress.Data.citySlots
      }
    },
    watch: {
      showCity (cur, old) {
        if (cur) {
          document.body.style.overflow = 'hidden'
        }
      },
      addAddress (cur, old) {
        if (cur) {
          this.count = cur.length
          if (this.count > 100) {
            this.addAddress = this.noAdd
            this.count = this.noAdd.length
          } else {
            this.noAdd = this.addAddress
          }
        }
      }
    },
    methods: {
      oncityChange (picker, values) {
        if (!values[0]) return
        this.cityTemp.key = values[0].key
        this.cityTemp.value = values[0].value
      },
      selectCity () {
        this.$store.dispatch('SELECTADDRESS_SELECTCITY', {
          city: this.cityTemp.value
        })
        this.toogleCity()
      },
      toogleCity (city) {
        if (this.isDisabled) return
        this.showCity = !this.showCity
        if (city) {
          this.$store.dispatch('SELECTADDRESS_UPDATEINDEX', {
            city: city
          })
        }
      },
      goBack () {
        this.$router.push({path: `/confirm?orderNo=${this.$route.query.orderNo}`})
      },
      addressClick () {
        // Mint.Toast('收单城市需和投保地区保持相同')
      },
      clickAddress (val) {
        var self = this
        if (val === 'selectAddredd') {
          if (!this.selectAddredd) {
            this.selectAddredd = !this.selectAddredd
            this.isDisabled = false
            this.acqAddress = null
          }
        } else {
          if ((!self.acqAddress && self.acqAddress !== 0) || (self.acqAddress !== val)) {
            this.acqAddress = val
            this.selectAddredd = false
            this.isDisabled = true
          }
        }
      },
      submitTrue () {
        if (this.selectAddredd) {
          if (!this.Req.name) {
            Mint.Toast('请填写姓名')
            return
          }
          if (!$.isMobile(this.Req.mobile)) {
            Mint.Toast('请填写正确的手机号码')
            return
          }
          if (!(/[\u4e00-\u9fa5]{4,}/).test(this.addAddress) || this.count < 4) {
            Mint.Toast('地址最少4个汉字')
            return
          }
          this.Req.detailAddress = this.addAddress
          const addressJson = {
            name: this.Req.name,
            mobile: this.Req.mobile,
            details: this.Req.detailAddress,
            provinceName: this.Req.province,
            cityName: this.Req.city,
            address: true,
            selectAddress: true,
            back: true,
            addressLength: this.count
          }
          this.$store.dispatch('SELECTADDRESS_UPDATED', addressJson)
        }
        if (this.acqAddress || this.acqAddress === 0) {
          const selectaJson = {
            name: this.addressData.delivery[this.acqAddress].name,
            mobile: this.addressData.delivery[this.acqAddress].mobile,
            details: this.addressData.delivery[this.acqAddress].details,
            provinceName: this.addressData.delivery[this.acqAddress].provinceName,
            cityName: this.addressData.delivery[this.acqAddress].cityName,
            address: false,
            index: this.acqAddress,
            back: true
          }
          this.$store.dispatch('SELECTADDRESS_UPDATED', selectaJson)
        }
        this.goBack()
      }
    },
    beforeMount () {
      $.setDocTitle(`选择收件地址`)
      this.addAddress = this.Req.detailAddress
      if (this.Req.detailAddress) {
        this.count = this.Req.detailAddress.length
      }
      if (!this.addressData.delivery || (this.addressData.delivery && this.addressData.delivery.length <= 0)) {
        this.selectAddredd = true
        this.isDisabled = false
      } else {
        if (!this.Options.address) {
          if (this.Options.index) {
            this.acqAddress = this.Options.index
          } else {
            this.acqAddress = 0
          }
        } else {
          this.selectAddredd = this.Options.selectAddress
          if (this.selectAddredd) {
            this.isDisabled = false
          }
        }
      }
      Mint.Indicator.open()
      this.$store.dispatch('SELECTADDRESS_GETAREA', {
        params: {vin: this.$store.state.Home.Data.vin, authCode: this.$store.state.Home.Data.authCode},
        callback: (arr) => {
          Mint.Indicator.close()
        }
      })
    }
  }
</script>

<style scoped lang="sass">
  @import "../../assets/style/selectAddress/index.scss"
</style>
