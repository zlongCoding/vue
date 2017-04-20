
import axios from '../axios'

import { api } from '../api'
// 'api/bsxq'
axios.defaults.withCredentials = true

export default {
  identifyBankCard: function (data) {
    return axios.post(api+'/payment/identifyBankCard',data)
  }
}

