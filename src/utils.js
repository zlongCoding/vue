import router from './router'
let utils = {
  version: '1.0.0',
  ele: (ele, all) => all
    ? document.querySelectorAll(ele)
    : document.querySelector(ele),
  setDocTitle: title => {
    document.title = title
    if (utils.isWeChat()) {
      let iframe = document.createElement('iframe')
      // iframe.src = '/favicon.ico'
      iframe.style.visibility = 'hidden'
      iframe.style.width = '1px'
      iframe.style.height = '1px'
      iframe.onload = () => {
        setTimeout(() => {
          document.body.removeChild(iframe)
        }, 0)
      }
      document.body.appendChild(iframe)
    }
  },
  serialize: (obj) => {
    let str = []
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        if (typeof obj[p] === 'object') {
          for (let val in obj[p]) {
            if (obj[p].hasOwnProperty(val)) {
              str.push(`option_fields[${val}]=${encodeURIComponent(obj[p][val])}`)
            }
          }
        } else {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
        }
      }
    }
    return str.join('&')
  },
  ajax: type => (url, data, disabledErrorAlert) => new Promise((resolve, reject) => {
    let p = {credentials: 'same-origin'}
    if (type === 'POST') {
      p = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        credentials: 'same-origin',
        body: JSON.stringify(Object.assign({}, data))
      }
    }
    if (type === 'GET') {
      url = `${url}?${utils.serialize(Object.assign({}, data))}`
    }
    fetch(url, p).then(res => {
      if (res.status === 200) {
        res.json().then(json => {
          if (json.data.status === 1006 && !res.url.includes('getUserInfo') && !res.url.includes('getWXInfo')) {
            router.push('/login')
            // console.log(router)
          } else {
            resolve && resolve(json.data)
          }
        })
      } else {
        reject && reject(res)
      }
    })
  }),
  GET: (url, data, disabledErrorAlert) => utils.ajax('GET')(url, data, disabledErrorAlert),
  POST: (url, data, disabledErrorAlert) => utils.ajax('POST')(url, data, disabledErrorAlert),
  url: (search = location.search) => {
    let args = {}
    let query = location.search.substring(1)
    let pairs = query.split('&')
    for (var i = 0; i < pairs.length; i++) {
      var pos = pairs[i].indexOf('=')
      if (pos === -1) continue
      var name = pairs[i].substring(0, pos)
      var value = pairs[i].substring(pos + 1)
      args[name] = value
    }
    return args
  },
  myreg: (val) => /^1[3456789]{1}\d{9}$/.test(val),
  numTest: (val) => /^\d{6}$/.test(val),
  isIOS: () => {
    var u = navigator.userAgent
    var _isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    return _isIOS
  },
  isWeChat: () => (/micromessenger/i).test(navigator.userAgent),
  isAndroid: () => {
    var u = navigator.userAgent
    var _isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    return _isAndroid
  },
  setStore: (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },
  getStore: name => {
    if (!name) return
    return window.localStorage.getItem(name)
  },
  removeStore: name => {
    if (!name) return
    window.localStorage.removeItem(name)
  },
  conversionDate: seconds => {
    return seconds < 10 ? `0${seconds}` : seconds
  },
  conversionTime: (stamp, dateTime) => {
    if (typeof stamp === 'string') {
      stamp = parseInt(stamp)
      stamp = stamp * 1000
    } else {
      stamp = stamp * 1000
    }
    var weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    var time = new Date(stamp)
    var y = time.getFullYear()
    var m = time.getMonth() + 1
    var d = time.getDate()
    var h = time.getHours()
    var mm = time.getMinutes()
    var dayO = time.getDay()
    // var s = time.getSeconds()
    if (dateTime === 0) {
      return m + '-' + utils.conversionDate(d)
    } else if (dateTime === 1) {
      return utils.conversionDate(h) + ':' + utils.conversionDate(mm)
    } else if (dateTime === 2) {
      return utils.conversionDate(d)
    } else if (dateTime === 3) {
      return weekDay[dayO]
    } else if (dateTime === 4) {
      return m
    } else if (dateTime === 5) {
      return m + '/' + utils.conversionDate(d)
    } else if (dateTime === 6) {
      return h
    } else if (dateTime === 7) {
      return y + '-' + m + '-' + utils.conversionDate(d)
    }
  },
  move: (e) => {
    e.preventDefault()
  },
  overflowHidden: () => {
    document.body.style.overflow = 'hidden'
    document.addEventListener('touchmove', utils.move, false)
  },
  overflowAuto: () => {
    document.body.style.overflow = ''
    document.removeEventListener('touchmove', utils.move, false)
  }
}
export default utils
