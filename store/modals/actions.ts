
import { ActionTree } from 'vuex/types/index'
import { IModalOptions, IModalsState } from '~/store/modals/state'

const actions: ActionTree<IModalsState, IModalsState> = {
  show ({ commit }, payload: IModalOptions) {
    console.log(payload)
    commit('SET_IS_SHOW', true)
    commit('SET_CURRENT_MODAL_KEY', payload.key)
    commit('SET_OPTIONS', payload)
  },
  hide ({ commit }) {
    commit('SET_IS_SHOW', false)
    commit('SET_CURRENT_MODAL_KEY', '')
    commit('SET_OPTIONS', {})
  },
  setUnclicable ({ commit }) {
    commit('SET_UNCLOSABLE')
  }
}

export default actions
