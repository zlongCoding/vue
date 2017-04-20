import { USER_HOSPITAL,USER_CONTENT ,USER_HOME ,USER_KESHI,USER_CITYALL , USER_ADDCITY,USER_PHOBE,USER_NAME} from './types'


const mutations = {
	[USER_HOSPITAL](state,user) {
       state.userhospital = user
	},	
	[USER_CONTENT](state,user) {
       state.usercity = user
	},
	[USER_HOME](state,user) {
       state.userhome = user
	},
	[USER_KESHI](state,user) {
       state.userkeshi = user
	},
    [USER_CITYALL](state,user) {
       state.usercityall = user
	},    
	[USER_ADDCITY](state,user) {
       state.useraddcity = user
	},
    [USER_PHOBE](state,user) {
       state.phone = user
	},
	[USER_NAME](state,user) {
       state.username = user
	},
  }
export default mutations
