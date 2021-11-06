import { MutationTree } from 'vuex'
import { IModalOptions, IModalsState } from '~/store/modals/state'

const mutations: MutationTree<IModalsState> = {
  SET_IS_SHOW: (state: IModalsState, payload: boolean) => (state.isShow = payload),
  SET_CURRENT_MODAL_KEY: (state: IModalsState, payload: string) => {
    state.currentModalKey = payload
  },
  SET_OPTIONS: (state: IModalsState, payload: IModalOptions) => (state.options = payload),
  SET_UNCLOSABLE (state: IModalsState) {
    state.options = {
      ...state.options,
      isUnclosable: true
    }
  }
}

export default mutations
