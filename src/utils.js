const ua = navigator.userAgent
let utils = {
  version: 0.01,
  isIOS: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  isAndroid: ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1,
  isiPhone: ua.indexOf('iPhone') > -1,
  isWeChat: () => (/micromessenger/i).test(navigator.userAgent),
  isMobile: phone => /^1(3|4|5|7|8)[0-9]\d{8}$/.test(phone),
  isCar: car => /(^(浙|闽|粤|京|津|冀|晋|蒙|辽|吉|黑|沪|苏|皖|赣|鲁|豫|鄂|湘|桂|琼|渝|川|贵|云|藏|陕|甘|青|宁|新){1}[A-Z0-9]{6,7}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(car),
  isID: function (ID) { // 是否是PRC身份证
    if (typeof ID !== 'string') return false
    var city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    }
    var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2))
    var d = new Date(birthday)
    var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate())
    var currentTime = new Date().getTime()
    var time = d.getTime()
    var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    var sum = 0
    var i
    var residue
    if (!/^\d{17}(\d|x)$/i.test(ID)) return false
    if (city[ID.substr(0, 2)] === undefined) return false
    if (time >= currentTime || birthday !== newBirthday) return false
    for (i = 0; i < 17; i++) {
      sum += ID.substr(i, 1) * arrInt[i]
    }
    residue = arrCh[sum % 11]
    if (residue !== ID.substr(17, 1)) return false
    return true
  },
  isPassport: (num) => /^[a-zA-Z0-9]{7,18}$/.test(num),
  isBankCard: num => /^\d{16}|\d{19}$/.test(num),
  isEmail: mail => /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(mail),
  isCarLicense: (num) => /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6,7}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/.test(num),
  fullTwo: num => num > 9
    ? num
    : '0' + num,
  ele: (ele, all) => all
    ? document.querySelectorAll(ele)
    : document.querySelector(ele),
  setDocTitle: (title, isFlag) => {
    document.title = title
    window._paq.push(['setDocumentTitle', title])

    let nativeSet = (title, func) => {
      utils.timer({time: 10, speed: 100}, func)
    }

    if (utils.isWeChat()) {
      let iframe = document.createElement('iframe')
      iframe.src = '/favicon.ico'
      iframe.style.visibility = 'hidden'
      iframe.style.width = '1px'
      iframe.style.height = '1px'
      iframe.onload = () => {
        setTimeout(() => {
          document.body.removeChild(iframe)
        }, 0)
      }
      document.body.appendChild(iframe)
    } else {
      /* eslint-disable */
      if (isFlag) {
        isFlag = true
      } else {
        isFlag = title === '智慧车险' || title === '服务授权'
      }

      if (utils.isiPhone) {
        nativeSet(title, (opts) => {
          if (typeof setInsuranceTitle !== 'undefined') {
            setInsuranceTitle(title, isFlag)
            opts.clear()
          }
        })
      } else if (utils.isAndroid) {
        nativeSet(title, (opts) => {
          if (typeof xfghujergh !== 'undefined' &&
            typeof xfghujergh.setInsuranceTitle !== 'undefined') {
            xfghujergh.setInsuranceTitle(title, isFlag)
            opts.clear()
          }
        })
      }
    }
    /* eslint-disable */
  },
  post: (url, data) => new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      credentials: 'same-origin',
      body: JSON.stringify(Object.assign({}, data))
    }).then(res => {
      window.Mint.Indicator.close()
      if (res.status === 200) {
        res.json().then(json => {
          if (+json.status === 100) {
            if (json.warningMessage) {
              window.Mint.Toast(json.warningMessage[0].message)
              window.Mint.Indicator && window.Mint.Indicator.close()
              reject && reject(json)
            } else {
              resolve && resolve(json.result)
            }

          } else {
            window.Mint.Toast(json.errorMessges[0].message)
            window.Mint.Indicator && window.Mint.Indicator.close()
            reject && reject(json.result)
          }
        })
      } else {
        window.Mint.Toast(`${res.status}错误, ${res.statusText}`)
      }
    }).catch(err => {
      if (err && err.message.indexOf('Failed to fetch') > -1) {
        window.Mint.Toast('亲～网络中断啦，请重试')
      }
    })
  }),
  get: url => fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'text/html'
    },
    credentials: 'same-origin'
  }).then(res => res.text()).then(res => res),
  objToSlot: obj => {
    let arr = []
    for (var prop in obj) {
      arr.push({value: prop, key: obj[prop]})
    }
    return arr
  },
  numberToChinese: (number, integer) => {
    if (integer) {
      return number ? (number / 10000 >= 1 ? (number / 10000) + '万' : number) : ''
    }
    return number ? (number / 10000 >= 1 ? (number / 10000).toFixed(2) + '万' : number.toFixed(2)) : ''
  },
  arrayNumberToSlot: (array, fn, flag) => {
    let resArray = []
    for (let num of array) {
      resArray.push({value: num, key: '' + fn(Number(num), flag)})
    }
    return resArray
  },
  /**
   * 对日期进行格式化
   * @param date 要格式化的日期
   * @param format 进行格式化的模式字符串
   *     支持的模式字母有：
   *     y:年,
   *     M:年中的月份(1-12),
   *     d:月份中的天(1-31),
   *     H:小时(0-23),
   *     m:分(0-59),
   *     s:秒(0-59),
   *     S:毫秒(0-999),
   *     q:季度(1-4)
   * @return String
   */
  dateformat: (date, format) => {
    if (!date) return

    var o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'H+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) // eslint-disable-line
      }
    }

    return format
  },
  timer: (options, callback) => {
    if (!options) return
    if (typeof options.time !== 'number') return

    /* eslint-disable */
    let
      defaults = {
        time: undefined,
        speed: undefined,
        count: undefined,
        gap: undefined
      },

      settings = Object.assign(defaults, options),

      time = settings.time,
      speed = settings.speed || 1000,
      count = settings.count >= 0 ? settings.count : Math.floor(time * 1000 / speed),
      gap = settings.gap || 1

    let
      clock,
      _this = this
    /* eslint-disable */

    _this.data = settings
    _this.clear = function () {
      clearTimeout(clock)
    }

    if (count === 0) {
      _this.clear()
    } else {
      settings.count = count -= gap

      clock = setTimeout(function () {
        utils.timer(settings, callback)
      }, speed)

      if (callback && typeof callback === 'function') {
        callback(_this)
      }
    }
  },
  onliePay: orderID => {
    if (orderID) {
      if (utils.isiPhone) {
        if (typeof createInsuranceOrderToPay !== 'undefined') {
          createInsuranceOrderToPay(orderID)
        }
      } else if (utils.isAndroid) {
        if (typeof xfghujergh !== 'undefined' &&
          typeof xfghujergh.createInsuranceOrderToPay !== 'undefined') {
          xfghujergh.createInsuranceOrderToPay(orderID)
        }
      }
    }
  },
  isNetwork: () => {
    // 是否有网络连接的方法  isNetWorkConnected() true为有网络连接，false为无网络连接
    let isNetwork = true
    /* eslint-disable */
    if (utils.isiPhone) {
      if (typeof isNetWorkConnected !== 'undefined') {
        isNetwork = isNetWorkConnected()
      }
    } else if (utils.isAndroid) {
      if (typeof xfghujergh !== 'undefined' &&
        typeof xfghujergh.isNetWorkConnected !== 'undefined') {
        isNetwork = xfghujergh.isNetWorkConnected()
      }
    }
    /* eslint-disable */

    return isNetwork
  },
  fullScreen: (callback) => {
    if (utils.isiPhone) {
      if (typeof setPaySuccessWebViewFullScreen !== 'undefined') {
        setPaySuccessWebViewFullScreen()
        return true
      }
    } else if (utils.isAndroid) {
      if (typeof xfghujergh !== 'undefined' && typeof xfghujergh.setPaySuccessWebViewFullScreen !== 'undefined') {
        xfghujergh.setPaySuccessWebViewFullScreen()
        return true
      }
    }
  },
  urlCode: () => process.env.NODE_ENV !== 'production' ? 'http://112.65.104.117:8443/' : '/',
  isShowCode: (data) => {
    if (!data) return

    let base64 = 'data:image/png;base64,'

    let [checkCode, bizQuestion, bizCheckCode, ctpQuestion, ctpCheckCode] = [data.checkCode, data.bizQuestion, data.bizCheckCode, data.ctpQuestion, data.ctpCheckCode]

    if (checkCode) {
      return checkCode ? base64 + checkCode : checkCode
    }

    if (bizQuestion || bizCheckCode || ctpQuestion || ctpCheckCode) {
      return {
        bizQuestion: bizQuestion,
        bizCheckCode: bizCheckCode ? base64 + bizCheckCode : bizCheckCode,
        ctpQuestion: ctpQuestion,
        ctpCheckCode: ctpCheckCode ? base64 + ctpCheckCode : ctpCheckCode
      }
    }

    return false
  },
  diffDate: (parmDate, sysDate) => {
    if (!parmDate) return
    if (Object.prototype.toString.call(parmDate) !== '[object Date]') return
    if (sysDate && Object.prototype.toString.call(sysDate) !== '[object Date]') return

    let date = sysDate || (new Date())
    return parseInt((date.getTime() - parmDate.getTime()) / (1000 * 60 * 60 * 24))
  }
}

export default utils
