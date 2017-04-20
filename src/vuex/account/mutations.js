import { BANK_PHONE ,BANK_CARD ,BANK_NEWCARD } from './types'


const mutations = {
	[BANK_PHONE](state,user) {
       state.bankmsg = user
	},
    [BANK_CARD](state,user) {
       state.bankcards = user
	},
	[BANK_NEWCARD](state,user) {
       state.banknewcard = user
	},
  }
export default mutations
