
import axios from '../axios'

import { api } from '../api'
// 'api/bsxq'
axios.defaults.withCredentials = true

export default {
  localLogin: function (data) {
    return axios.post(api+'/userInfo/login/phone',data)
  },
    getpoenId: function (data) {
    return axios.get(api+'/userInfo/login?code='+data)
  },
  registerMessge: function (data) {
    return axios.post(api+'/doctorInfo/doctor/info/add',data)
  },
  checkPhoneNum: function(data){
     return axios.get(api+'/baseService/check/phone/?phoneNumber='+data)
  },
  sendMessage: function (data) {
    return axios.get(api+'/baseService/sms/code/send/?phone='+data)
  },
  sendoffice: function (data) {
    return axios.get(api+'/baseInfo/search/department?lvl='+data)
  },
   checkMessage: function (data) {
    return axios.get(api+'/baseService/sms/code/verify?'+data)
  },
  GPSloding: function(data) {
    return axios.get(api+'/baseService/location/gps'+data)
  },
   searchCity: function(data) {
    return axios.get(api+'/baseInfo/getCity')
  },
  searchFullcity: function(data) {
    return axios.get(api+'/base/getFullCity')
  },
   searchHospital: function(data) {
    return axios.get(api+'/baseInfo/search/hospital?'+data)
  },
  weChatconfig: function(data) {
    return axios.post(api+'/userLogin/get/jssdk',data)
  },
   saveHospital: function(data) {
    return axios.post(api+'/baseInfo/hospital/save',data)
  },
  searchCitys: function(data) {
    return axios.get(api+'/openSearch/city/'+data)
  },
   sendezhicheng: function(data) {
    return axios.get(api+'/baseInfo/level/?lvl='+data)
  },
   sendaction: function(data) {
    return axios.get(api+'/userLogin/login?code='+data)
  },
  sickness: function(data) {
    return axios.get(api+'/baseInfo/search/sickness?bigCode='+data)
  },
  goodat: function(data) {
    return axios.post(api+'/doctorInfo/doctor/goodat',data)
  }
}

