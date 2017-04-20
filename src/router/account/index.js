

// const pay_num = r => require.ensure([], () => r(require('../../components/pay/pay_num.vue')), '/')


const myaccount = resolve=>require(['../../components/account/myaccount.vue'],resolve);
const particulars = resolve=>require(['../../components/account/particulars.vue'],resolve);
const bank = resolve=>require(['../../components/account/bank.vue'],resolve);
const withdraw = resolve=>require(['../../components/account/withdraw.vue'],resolve);
const addbankone = resolve=>require(['../../components/account/addbankone.vue'],resolve);
const addbanktwo = resolve=>require(['../../components/account/addbanktwo.vue'],resolve);
const addbanklast = resolve=>require(['../../components/account/addbanklast.vue'],resolve);
const success = resolve=>require(['../../components/account/success.vue'],resolve);


export default [{
	  path:'/myaccount',
	  component:myaccount
},{
      path: '/partil',
      component: particulars
},{
      path: '/success',
      component: success
},{
      path: '/adbklast',
      component: addbanklast
},{
      path: '/adbkone',
      component: addbankone
},{
      path: '/adbktwo',
      component: addbanktwo
},{
      path: '/bank',
      component: bank
},{
      path: '/withdraw',
      component: withdraw
}
];