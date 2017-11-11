import Vue from 'vue'
import Vuex from 'vuex'

import State from './state/index'
import Actions from './actions/index'
import Mutations from './mutations/index'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: State,
  actions: Actions,
  mutations: Mutations,
  getters
})

window.store = store

export default store
