import $ from '@/utils'
import config from '@/config'

export default {
  Options: {
    vin: '',
    showDemo: false,
    showArea: false,
    showArgument: false,
    showCertificate: false,
    startDate: new Date('1988-01-01'),
    endDate: new Date(),
    area: [
      {
        flex: 1,
        values: [],
        textAlign: 'center'
      }, {
        divider: true,
        content: '-'
      }, {
        flex: 1,
        values: [],
        textAlign: 'center'
      }
    ],
    slots: [
      {
        flex: 1,
        values: $.objToSlot(config.certificateType),
        textAlign: 'center'
      }
    ],
    province: {},
    city: {},
    dealerList: [],
    currentDealer: null
  },
  Data: {
    argument: '这是协议这是协'
  },
  Req: {},
  calculate: {},
  isSelectDealer: false
}
