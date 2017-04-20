//正则表达式验证手机号码
export const myreg = /^1[34578]{1}\d{9}$/;
//验证验证码 六位
export const numTest = /^\d{6}$/;

//正则表达式验证姓名
export const nameTest = /^[\u0391-\uFFE5A-Za-z]+$/;
export const englishNameTest = /^[a-z\/ ]{2,20}$/i;


//正则表达式验证数字两个小数点以及头部不能是0
export const reg = /^[1-9]\d*(?:\.\d{1,2}|\d*)$/;

//只能为汉字
export const chinese = /^[\u2E80-\u9FFF（）()]+$/;

//只能是中文和点
export const pattern= /^[\u2E80-\u9FFF .]+$/;

//清楚前后端的空格
export const delHTML = (str) => {
     var result=str.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
     return result;
}
//安卓端
export const isAndroid =  () => {
    var u = navigator.userAgent;
    var _isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // android终端或者uc浏览器
    return _isAndroid;
}
//苹果端
export const isIOS = () => {
    var u = navigator.userAgent;
     var _isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    return _isIOS;
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}
