import config from '@/config'

export default(Vue) => {
  Vue.filter('filterDemo', text => `${text} -`)
  Vue.prototype.diffSizeAmount = (num, symbol) => {
    let amount = (+num).toFixed(2)
    let arr = `${amount}`.split('.')
    return `${symbol ? '<small>' + symbol + '</small>' : ''}${arr[0]}.<small>${arr[1]}</small>`
  }
  Vue.filter('orderStatus', status => config.orderStatus[status])
}
