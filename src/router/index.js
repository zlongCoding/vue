import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import RosterSelectSite from '@/components/RosterSelectSite'
import DeviceList from '@/components/deviceList'
import UnregisteredDevice from '@/components/unregisteredDevice'
import Register from '@/components/Register'
import Remarks from '@/components/Remarks'
import Devicedetails from '@/components/Devicedetails'

Vue.use(Router)
const routes = [{
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },{
    path: '/RosterSelectSite',
    name: 'RosterSelectSite',
    component: RosterSelectSite
  },{
    path: '/DeviceList',
    name: 'DeviceList',
    component: DeviceList
  },{
    path: '/UnregisteredDevice',
    name: 'UnregisteredDevice',
    component: UnregisteredDevice
  },{
    path: '/Register',
    name: 'Register',
    component: Register
  },{
    path: '/Remarks',
    name: 'Remarks',
    component: Remarks
  },{
    path: '/Devicedetails',
    name: 'Devicedetails',
    component: Devicedetails
  }];
export default new Router({
  routes
})
