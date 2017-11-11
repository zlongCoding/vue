export default {
  SERVICE_COMPANY: ({commit, state}, config) => {
    commit('services_company', config)
  },
  SERVICE_DETAIL: ({commit, state}, config) => {
    commit('services_detail', config)
  },
  SERVICE_HASBOUGHT: ({commit, state}, config) => {
    commit('services_hasbought', config)
  },
  SERVICE_BUYAREA: ({commit, state}, config) => {
    commit('services_buyarea', config)
  },
  SERVICE_VOUCHERSNO: ({commit, state}, config) => {
    commit('services_vouchersno', config)
  },
  SERVICE_MAPLIST: ({commit, state}, config) => {
    commit('services_maplist', config)
  }
}
