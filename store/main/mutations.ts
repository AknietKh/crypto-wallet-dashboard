import { MutationTree } from 'vuex'
import { IMainState } from '~/store/main/state'

const mutations: MutationTree<IMainState> = {
  setLoading (state, status) {
    state.isLoading = status
  }
}

export default mutations
