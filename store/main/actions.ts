
import { ActionTree } from 'vuex/types/index'
import { IMainState } from '~/store/main/state'

const actions: ActionTree<IMainState, IMainState> = {
  setLoading ({ commit }, status) {
    commit('setLoading', status)
  }
}

export default actions
