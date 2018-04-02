import Vue from 'vue'
import Vuex from 'vuex'

import State from './state/index'
import Actions from './actions/index'
import Mutations from './mutations/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: State,
  actions: Actions,
  mutations: Mutations
})

window.store = store

export default store