import config from '@/config'
import utils from '@/utils'

let fullTwo = num => num > 9 ? num : '0' + num

export default (Vue) => {
  Vue.filter('filterDemo', text => `${text} -`)
  Vue.filter('config', (key, val) => key ? config[val][key] : '')
  Vue.filter('formatTime', (time, isFull) => {
    if (Object.prototype.toString.call(time) !== '[object Date]') return ''
    let now = new Date(time)
    let year = now.getFullYear()
    let month = fullTwo(now.getMonth() + 1)
    let day = fullTwo(now.getDate())
    let hour = fullTwo(now.getHours())
    let min = fullTwo(now.getMinutes())
    let bFormat = year + '-' + month + '-' + day
    let sFormat = hour + ':' + min
    return isFull ? (bFormat + ' ' + sFormat) : bFormat
  })
  Vue.filter('insure', (item) => {
    // 不投保
    if (item && item.isSelect === '0') {
      return config.insureState.NOINSURE
    } else {
      // 投保无金额
      if (item && (!item.sumInsured || item.sumInsured === 'null')) {
        return config.insureState.INSURE
      } else {
        // 投保有金额
        return utils.numberToChinese(item.sumInsured, true)
      }
    }
  })
  Vue.filter('numberToChinese', number => number / 10000 >= 1 ? (number / 10000).toFixed(2) + '万' : number)
  Vue.filter('doubleNumber', number => typeof number === 'string' ? (+number).toFixed(2) : number)
  Vue.filter('replaceCode', content => content ? content.replace(/-/g, '.') : '0')
  Vue.filter('formatMinute', minute => minute < 60 ? minute + '分钟' : Math.floor(minute / 60) + '小时' + minute % 60 + '分钟')
}
