import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
	 userhospital: '',
	 usercity:'',
	 userhome:'',
	 userkeshi:'',
	 usercityall:'',
	 useraddcity:'',
	 phone:null,
	 username:''
}


export default{
  state,
  actions,
  getters,
  mutations
}
