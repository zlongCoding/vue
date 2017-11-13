let utils = {
  version: 0.01,
  isWeChat: () => (/micromessenger/i).test(navigator.userAgent),
  isMobile: phone => /^1[3|4|5|7|8][0-9]{9}$/.test(phone),
  isID: num => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(num),
  isBankCard: num => /^\d{16}|\d{19}$/.test(num),
  isEmail: mail => /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(mail),
  fullTwo: num => num > 9
    ? num
    : '0' + num,
  ele: (ele, all) => all
    ? document.querySelectorAll(ele)
    : document.querySelector(ele),
  setDocTitle: title => {
    document.title = title
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
          if (+json.status === 100 && !json.warningMessage) {
            resolve && resolve(json.result)
          } else {
            reject && reject(json)
            !disabledErrorAlert && window.swal({
              title: json.errorMessges[0].message,
              type: 'error',
              confirmButtonClass: 'singleBtn',
              confirmButtonText: '确认'
            })
          }
        })
      } else {
        reject && reject(res)
      }
    })
  }),
  alert: (text, type) => {
    window.swal({
      title: text,
      type: type,
      confirmButtonClass: 'singleBtn',
      confirmButtonText: '确认'
    })
  },
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
  }
}
export default utils
