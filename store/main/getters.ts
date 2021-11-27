
import { GetterTree } from 'vuex/types/index'
import { IMainState } from '~/store/main/state'

const getters: GetterTree<IMainState, IMainState> = {
  getLoadingStatus: (state): boolean => state.isLoading
}

export default getters
