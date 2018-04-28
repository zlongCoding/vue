import config from '@/config'
import utils from '@/utils.js'
export default(Vue) => {
  Vue.filter('filterDemo', text => `${text} -`)
  Vue.prototype.diffSizeAmount = (num, symbol) => {
    let amount = (+num).toFixed(2)
    let arr = `${amount}`.split('.')
    return `${symbol ? '<small>' + symbol + '</small>' : ''}${arr[0]}.<small>${arr[1]}</small>`
  }
  Vue.filter('orderStatus', status => config.orderStatus[status])
  Vue.filter('daysChange', (stamp) => {
    return utils.conversionTime(stamp, 0)
  })
  Vue.filter('timeChange', (stamp) => {
    return utils.conversionTime(stamp, 1)
  })
  Vue.filter('dayChange', (stamp) => {
    return utils.conversionTime(stamp, 2)
  })
  Vue.filter('weekChange', (stamp) => {
    return utils.conversionTime(stamp, 3)
  })
  Vue.filter('dayStyle', (stamp) => {
    return utils.conversionTime(stamp, 5)
  })
  Vue.filter('yearStyle', (stamp) => {
    return utils.conversionTime(stamp, 8)
  })
  Vue.filter('secondTime', (time) => {
    return utils.secondToTime(time)
  })
}
