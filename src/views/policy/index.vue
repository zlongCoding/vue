<template>
  <div id="insurance">
    <div class="cellList">
      <ul>
        <li>
          <b>投保地区</b>
          <span style="color: #333333">{{Options.province.value}} {{Options.city.value}}</span>
        </li>
        <li id='dealer' @click="toSelectDealer">
          <b>服务经销商</b>
          <span
              v-if="Options.currentDealer && Options.currentDealer.dealerName">{{Options.currentDealer.dealerName}}</span>
          <span v-if="!Options.currentDealer || !Options.currentDealer.dealerName">该城市暂无经销商</span>
          <i class="cell-allow-right"></i>
        </li>
      </ul>
    </div>

    <h5>
      车辆信息
      <span>
        确保信息与行驶证一致
        <a href="javascript:void(0)" @click="toggle('showDemo')">示例</a>
      </span>
    </h5>

    <div class="cellList">
      <ul>
        <li>
          <b>车牌号</b>
          <div class="inputWrap">
            <input type="text" v-model="Req.licenseNo" :disabled="mock.licenseNo"/>
          </div>
        </li>
        <li @click="showDatePicker">
          <b>注册日期</b>
          <span style="color: #333333" v-if="Req.isRegisterDate">{{Req.registerDate | formatTime}}</span>
          <span style="color: #333333" v-else>{{initRegisterDate}}</span>
          <i class="cell-allow-right"></i>
        </li>
        <li>
          <b>品牌型号</b>
          <div class="inputWrap">
            <input type="text" v-model="Req.modelName" :disabled="mock.modelName"/>
          </div>
        </li>
        <li>
          <b>车辆识别代号</b>
          <div class="inputWrap">
            <input type="text" v-model="Req.vin" :disabled="mock.vin"/>
          </div>
        </li>
        <li>
          <b>发动机号码</b>
          <div class="inputWrap">
            <input type="text" v-model="Req.engineNo" :disabled="mock.engineNo"/>
          </div>
        </li>
        <li @click="showDatePicker2" v-if="!Req.haveCtpStartDate">
          <b>交强险起保期</b>
          <span style="color: #333333" v-if="Req.isCtpStartDate">{{Req.ctpStartDate | formatTime(true)}}</span>
          <span style="color: #333333" v-else>{{initCtpStartDate}}</span>
          <i class="cell-allow-right"></i>
        </li>
      </ul>
    </div>

    <h5>车主信息</h5>

    <div class="cellList">
      <ul>
        <li>
          <b>车主姓名</b>
          <div class="inputWrap">
            <input type="text" v-model="Req.ownerName"/>
          </div>
        </li>
        <li>
          <b>手机号码</b>
          <div class="inputWrap">
            <input type="tel" maxlength="11" v-model="Req.ownerMobile"/>
          </div>
        </li>
        <li>
          <b>证件类型</b>
          <span id="idCard">{{Req.certificateType | config('certificateType')}}</span>
          <!-- <i class="cell-allow-right"></i> -->
        </li>
        <li>
          <b>证件号</b>
          <div class="inputWrap">
            <input type="text" v-model="Req.certificateNo" @focus="focus" ref="idInput" id="idInput"/>
          </div>
        </li>
      </ul>
    </div>

    <!--<p class="argument">-->
    <!--<label>-->
    <!--<span :class=" checkedBox ? 'checked-box' : 'checked-box-no' "></span>-->
    <!--<input type="checkbox" ref="input" :checked="checkedBox" @change="checkbox"/>-->
    <!--阅读并接受 &nbsp;</label>-->
    <!--<a style="line-height: 1.2" href="javascript:void(0) " @click="toPage('/agreement')">-->
    <!--《上汽保险投保协议》-->
    <!--</a>-->
    <!--</p>-->

    <button class="btn" @click="submit">下一步</button>

    <div style="position: relative; height: 40px; line-height: 5">
      <p style="text-align: center; width: 100%; font-size: 12px;">由上海汽车集团保险销售有限公司提供保险支持</p>
    </div>

    <mt-popup v-model="Options.showDemo">
      <div class="license">
        <div class="imgWrap">
          <label>示例</label>
          <img src="../../assets/images/license.jpg"/>
        </div>
        <div class="closeLicense">
          <a href="javascript:void(0)" @click="toggle('showDemo')">关闭</a>
        </div>
      </div>
    </mt-popup>

    <mt-popup v-model="Options.showArgument">
      <div class="argumentPop">
        <h3>车险协议</h3>
        <div class="content">
          {{Data.argument}}
        </div>
        <div class="closeArgument">
          <a href="javascript:void(0)" @click="toggle('showArgument')">我知道了</a>
        </div>
      </div>
    </mt-popup>

    <mt-datetime-picker v-model="Req.registerDate" @confirm="confirmRegisterDate" ref="picker" type="date"
                        year-format="{value}年"
                        month-format="{value}月" date-format="{value}日" :start-date="Options.startDate"
                        :end-date="Options.endDate"></mt-datetime-picker>

    <mt-datetime-picker v-model="Req.ctpStartDate" @confirm="confirmCtpStartDate" ref="picker2" type="datetime"
                        year-format="{value}"
                        month-format="{value}" date-format="{value}" hour-format="{value}" minute-format="{value}"
                        :start-date="cptDate.start"
                        :end-date="cptDate.end"></mt-datetime-picker>

    <mt-popup v-model="Options.showCertificate" position="bottom">
      <mt-picker :slots="Options.slots" ref="certificatePicker" :visibleItemCount="5" value-key="key"
                 :showToolbar="true">
        <span class="mint-datetime-action mint-datetime-cancel" @click="toggle('showCertificate')">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="selectCertificate">确定</span>
        <div class="picker-toolbar-hr"></div>
      </mt-picker>
    </mt-popup>

    <!--<mt-popup v-model="Options.showArea" position="bottom">-->
    <!--<mt-picker :slots="Options.area" ref="areaPicker" @change="onAreaChange" :visibleItemCount="5" value-key="value"-->
    <!--:showToolbar="true">-->
    <!--<span class="mint-datetime-action mint-datetime-cancel" @click="toggle('showArea')">取消</span>-->
    <!--<span class="mint-datetime-action mint-datetime-confirm" @click="selectArea">确定</span>-->
    <!--<div class="picker-toolbar-hr"></div>-->
    <!--</mt-picker>-->
    <!--</mt-popup>-->

    <!--<mt-popup v-model="showIdcard" position="bottom">-->
    <!--<mt-picker :slots="idcardSlots" @change="onValuesChange" value-key="key" :showToolbar="true"-->
    <!--:visibleItemCount='3'>-->
    <!--<span class="mint-datetime-action mint-datetime-cancel" @click="toogleIdcard()">取消</span>-->
    <!--<span class="mint-datetime-action mint-datetime-confirm" @click="selectIdcard()">确定</span>-->
    <!--<div class="picker-toolbar-hr"></div>-->
    <!--</mt-picker>-->
    <!--</mt-popup>-->
    <codebox ref="codebox" :codeBoxCancel="codeBoxCancel" :codeBoxConfirm="codeBoxConfirm" :codeBoxSource="codeDB"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import utils from '@/utils'
  import config from '@/config'
  import Mint from 'mint-ui'
  import Codebox from './codebox.vue'
  //  import { getPolicyArea, getPolicyDealer } from '@/api/policy'

  export default {
    name: 'policy',
    data () {
      return {
        policyArea: null,
        isLoad: false,
        fullscreen: false,
        codeDB: {},
        codeParam: null,
        orderNo: '',
        cptDate: {
          start: new Date(),
          end: new Date()
        },

        checkedBox: true,
        showIdcard: false,
        idcardSlots: [
          {
            flex: 1,
            values: [
              {
                key: '身份证',
                value: 'ID_CARD'
              },
              {
                key: '护照',
                value: 'PASSPORT'
              },
              {
                key: '组织机构代码',
                value: 'ORG_CODE'
              },
              {
                key: '营业执照',
                value: 'BUSINESS_LICENSE'
              }],
            textAlign: 'center',
            defaultIndex: 1000
          }
        ],
        idCard: null,
        initRegisterDate: '',
        initCtpStartDate: '',
        mock: {
          modelName: false,
          vin: false,
          engineNo: false
        }
      }
    },
    computed: {
      data () {
        return this.$store.state.Insurance
      },
      Options () {
        return this.$store.state.Insurance.Options
      },
      Data () {
        return this.$store.state.Insurance.Data
      },
      Req () {
        return this.$store.state.Insurance.Req
      },
      ...mapGetters([
        'vin',
        'vouchersNo',
        'authCode'
      ])
    },
    components: {
      Codebox
    },
    methods: {
      codeBoxCancel (data) {
        console.log('codeBoxCancel')
        this.$refs.codebox.clear()
      },
      codeBoxConfirm () {
        console.log('codeBoxConfirm')
        this.codeParam = this.$refs.codebox.values()
        this.submit()
      },
      confirmRegisterDate (val) {
        if (this.Req.firstDriveTime) {
          console.log(Math.abs(utils.diffDate((new Date(this.Req.firstDriveTime)), val)))
          if (!(Math.abs(utils.diffDate((new Date(this.Req.firstDriveTime)), val)) <= 90)) {
            Mint.Toast('注册日期填写错误，请参照行驶证填写。')
            console.log('registerDate：' + this.Req.registerDate)
            console.log('initRegisterDate：' + this.initRegisterDate)
            this.Req.registerDate = this.initRegisterDate ? (new Date(this.initRegisterDate)) : (new Date())
            console.log('注册日期1：' + utils.dateformat(val, 'yyyy-MM-dd HH:mm'))
            console.log('注册日期2：' + utils.dateformat(this.Req.registerDate, 'yyyy-MM-dd HH:mm'))
            return
          } else {
            this.Req.isConfirmRegisterDate = true
            if (this.Req.isRegisterDate) {
              this.Req.registerDate = val
            } else {
              this.initRegisterDate = utils.dateformat(val, 'yyyy-MM-dd')
              this.Req.registerDate = val
            }
          }
        } else {
          Mint.Toast('缺少必要参数, 请联系客服')
          return
        }
        console.log('注册日期3：' + utils.dateformat(val, 'yyyy-MM-dd HH:mm'))
        console.log('注册日期4：' + utils.dateformat(this.Req.registerDate, 'yyyy-MM-dd HH:mm'))
      },
      confirmCtpStartDate (val) {
        this.Req.isConfirmCtpStartDate = true
        if (this.Req.isCtpStartDate) {
          this.Req.ctpStartDate = val
        } else {
          this.initCtpStartDate = utils.dateformat(val, 'yyyy-MM-dd HH:mm')
          this.Req.ctpStartDate = val
        }
      },
      focus () {
        var documentHeight = window.innerHeight
        var documentScroll = document.body.scrollTop
        var setTime = setTimeout(function () {
          clearTimeout(setTime)
          if (!document.body.scrollTop) {
            return
          }
          if (documentHeight - window.innerHeight > 50 && documentScroll === document.body.scrollTop) {
            document.body.style = `transform:translateY(${-(documentHeight - window.innerHeight)}px)`
            setTimeout(function () {
              setHeight(window.innerHeight)
            }, 300)
          }
        }, 2000)

        function setHeight (clientHeight) {
          var interVal = setInterval(function () {
            if (clientHeight !== window.innerHeight) {
              document.body.style = 'inherit'
              clearInterval(interVal)
            }
          }, 300)
        }
      },
      toggle (type) {
        this.$store.dispatch('INSURANCE_TOGGLE', type)
      },
      toPage (url) {
        this.$router.push({path: url})
      },
      toSelectDealer () {
        console.log(this.Req)
        let fromPath = location.search.slice(0)
        this.$router.push({path: `/selectDealer${fromPath}`})
      },
      showDatePicker () {
        this.$refs.picker.open()
        document.body.style.overflow = 'hidden'
        console.log(this.Req.registerDate)
      },
      showDatePicker2 () {
        document.body.style.overflow = 'hidden'
        this.$refs.picker2.open()
      },
      showCertificate () {
        this.toggle('showCertificate')
        this.Options.slots[0].defaultIndex = Object.keys(config.certificateType).indexOf(this.Req.certificateType)
      },
      checkbox () {
        this.checkedBox = !this.checkedBox
      },
      selectCertificate () {
        let val = this.$refs.certificatePicker.getValues()
        if (val[0]) {
          this.$store.dispatch('INSURANCE_UPDATE_REQ', {key: 'certificateType', value: val[0].value})
        }
        this.toggle('showCertificate')
      },
//      selectArea () {
//        let area = this.$refs.areaPicker.getValues()
//        this.$store.dispatch('INSURANCE_UPDATE_CITY_VALUE', {city: area[1], province: area[0]})
//        this.$store.dispatch('INSURANCE_GET_DEALER_LIST', {city: area[1].key, province: area[0].key})
//        this.toggle('showArea')
//      },
//      showArea () {
//        debugger
//        this.Options.area[0].defaultIndex = this.Options.province.index
//        this.Options.area[2].defaultIndex = this.Options.city.index
//        this.toggle('showArea')
//      },
      onAreaChange (picker, values) {
        if (!this.$refs.areaPicker) return
        if (this.$refs.areaPicker.getValues()[0]) {
          let index = this.$refs.areaPicker.getValues()[0].index
          this.$store.dispatch('INSURANCE_UPDATE_CITY', index)
        }
      },
//      toogleIdcard () {
//        this.showIdcard = !this.showIdcard
//      },
//      onValuesChange (picker, values) {
//        if (!values[0]) return
//        this.idCard = values[0].value
//      },
//      selectIdcard () {
//        this.Req.certificateType = this.idCard
//        this.toogleIdcard()
//      },
      submit () {
        let registerDate = this.Req.isRegisterDate ? this.Req.registerDate : this.initRegisterDate
        let ctpStartDate = this.Req.isCtpStartDate ? this.Req.ctpStartDate : this.initCtpStartDate

        console.log('注册日期：' + registerDate)
        console.log('起保时间：' + ctpStartDate)

        if (this.isLoad) {
          return
        }

        if (!this.Req.province) {
          Mint.Toast('请选择投保地区')
          return
        } else if (!this.Req.dealerCode) {
          Mint.Toast('请选择服务经销商')
          return
        } else if (!this.Req.licenseNo) {
          Mint.Toast('请输入车牌号')
          return
        } else if (!registerDate) {
          Mint.Toast('请输入注册日期')
          return
        } else if (!utils.isCarLicense(this.Req.licenseNo)) {
          Mint.Toast('车牌号格式错误')
          return
        } else if (!this.Req.haveCtpStartDate && !ctpStartDate) {
          Mint.Toast('请输入交强险起保期')
          return
        } else if (!this.Req.ownerName) {
          Mint.Toast('请输入车主姓名')
          return
        } else if (!utils.isMobile(this.Req.ownerMobile)) {
          Mint.Toast('请输入正确的手机号码')
          return
        } else if (!this.Req.certificateType) {
          Mint.Toast('请选择证件类型')
          return
        } else if (this.Req.certificateType === 'ID_CARD' && !utils.isID(this.Req.certificateNo)) {
          Mint.Toast('身份证号码格式不正确')
          return
        } else if (this.Req.certificateType === 'PASSPORT' && !utils.isPassport(this.Req.certificateNo)) {
          Mint.Toast('护照号码格式不正确')
          return
        } else if (!this.checkedBox) {
          Mint.Toast('请阅读并接受协议')
          return
        } else {
          let params = {
            'dealerCode': this.Options.currentDealer.dealerCode,
            'owner': {
              'certificateNo': this.Req.certificateNo,
              'certificateType': this.Req.certificateType,
              'mobile': this.Req.ownerMobile,
              'name': this.Req.ownerName
            },
            'vehicle': {
              'engineNo': this.Req.engineNo,
              'licenseNo': this.Req.licenseNo,
              'modelName': this.Req.modelName,
              'registerDate': typeof registerDate === 'string' ? registerDate : utils.dateformat(registerDate, 'yyyy-MM-dd'),
              'vin': this.Req.vin
            },
            'ctpStartDate': typeof ctpStartDate === 'string' ? ctpStartDate : utils.dateformat(ctpStartDate, 'yyyy-MM-dd HH:mm'),
            'vouchersNo': this.vouchersNo || this.$route.query.vouchersNo
          }

          if (this.codeParam) {
            Object.assign(params, this.codeParam)
          }

          if (this.orderNo) {
            params.orderNo = this.orderNo
          }

          Mint.Indicator.open()
          this.isLoad = true

          this.$store.dispatch('POLICY_CALCULATE', params).then(response => {
            Mint.Indicator.close()
            this.isLoad = false
            if (response) {
              if (utils.isShowCode(response)) {
                this.codeDB = utils.isShowCode(response)
                this.$refs.codebox.show()
              } else {
                this.$router.push({path: '/confirm', query: {orderNo: response.orderNo}})
              }
            }
          }).catch(err => {
            this.isLoad = false
            console.log(err)
          })
        }
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (from.name === 'insuranceList') {
          vm.orderNo = vm.$route.query.orderNo
        }
      })
    },
    created () {
      let vouchersNo = this.$route.query.vouchersNo || this.vouchersNo

      this.cptDate.start = new Date(this.cptDate.start.setHours(this.cptDate.start.getHours() + 1))
      this.cptDate.end = new Date(this.cptDate.end.setFullYear(this.cptDate.end.getFullYear() + 5))

      this.fullscreen = this.$route.query.fullscreen

      if (!vouchersNo || !this.vin) {
        Mint.Toast('缺少必要的参数，页面初始化失败')
        return
      }

      if (typeof vouchersNo !== 'string') {
        Mint.Toast('卡券号有问题，请查证后再使用')
        return
      }

      if (!this.Req.isRegisterDate) {
        this.initRegisterDate = this.Req.isConfirmRegisterDate ? utils.dateformat(this.Req.registerDate, 'yyyy-MM-dd') : ''
      }

      if (!this.Req.isCtpStartDate) {
        this.initCtpStartDate = this.Req.isConfirmCtpStartDate ? utils.dateformat(this.Req.ctpStartDate, 'yyyy-MM-dd HH:mm') : ''
      }

      console.log('注册日期：' + this.Req.isRegisterDate)
      console.log('注册日期：' + this.initRegisterDate)
      console.log('起保时间：' + this.Req.isCtpStartDate)
      console.log('起保时间：' + this.initCtpStartDate)

      if (!this.$store.state.Insurance.isSelectDealer) {
        this.$store.state.Insurance.isSelectDealer = false
        Mint.Indicator.open()
        this.$store.dispatch('INSURANCE_GETAREA', {
          params: {area: {vin: this.vin, authCode: this.authCode}, vouchersNo: vouchersNo},
          callback: (arr) => {
            Mint.Indicator.close()
            if (this.Req.modelName) {
              this.mock.modelName = true
            }
            if (this.Req.vin) {
              this.mock.vin = true
            }
            if (this.Req.engineNo) {
              this.mock.engineNo = true
            }
            if (this.Req.licenseNo) {
              this.mock.licenseNo = true
            }
          }
        })
      }
    },
    beforeMount () {
      if (this.fullscreen) {
        utils.fullScreen()
        utils.setDocTitle('车险报价', true)
      } else {
        utils.setDocTitle('车险报价')
      }
    },
    mounted () {
      this.Options.area[0].defaultIndex = 1000
      this.Options.area[2].defaultIndex = 1000
      this.Options.slots[0].defaultIndex = 1000
    },
    destroyed () { }
  }

</script>

<style scoped lang="scss">
  @import "../../assets/style/insurance/index.scss";
</style>
