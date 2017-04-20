

// const pay_num = r => require.ensure([], () => r(require('../../components/pay/pay_num.vue')), '/')


const phonnum = resolve=>require(['../../components/login/phonnum.vue'],resolve);
const identity = resolve=>require(['../../components/login/identity.vue'],resolve);
const register = resolve=>require(['../../components/login/register.vue'],resolve);
const information = resolve=>require(['../../components/login/information.vue'],resolve);
const keshi = resolve=>require(['../../components/login/keshi.vue'],resolve);
const good = resolve=>require(['../../components/login/good.vue'],resolve);
const search = resolve=>require(['../../components/login/search.vue'],resolve);
const changeceo = resolve=>require(['../../components/login/changeceo.vue'],resolve);
const rgtsuccess = resolve=>require(['../../components/login/rgtsuccess.vue'],resolve);
const citychange = resolve=>require(['../../components/login/searchcity.vue'],resolve);
const addhospital = resolve=>require(['../../components/login/addhospital.vue'],resolve);
const goodkeshi = resolve=>require(['../../components/login/goodkeshi.vue'],resolve);
const nmesuccess = resolve=>require(['../../components/login/nmesuccess.vue'],resolve);
const phonenm = resolve=>require(['../../components/login/phonenm.vue'],resolve);

// const pay_phon = resolve=>require(['../../components/pay/pay_phon.vue'],resolve);
export default [{
	  path:'/phonnum',
	  component:phonnum
},{
	  path:'/register',
	  component:register
},{
	  path:'/phonenm',
	  component:phonenm
},{
	  path:'/nmescs',
	  component:nmesuccess
},{
	  path:'/goodks',
	  component:goodkeshi
},{
	  path:'/addhspt',
	  component:addhospital
},{
	  path:'/rgtsucs',
	  component:rgtsuccess
},{
	  path:'/citychg',
	  component:citychange
},{
	  path:'/chgceo',
	  component:changeceo
},{
	  path:'/search',
	  component:search
},{
	  path:'/keshi',
	  component:keshi
},{
	  path:'/good',
	  component:good
},{
	  path:'/identity',
	  component:identity
},{
	  path:'/inft',
	  component:information
}
,{
      path: '/',
      redirect: '/register'
}
];