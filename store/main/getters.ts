
import { GetterTree } from 'vuex/types/index'
import { IMainState, ITokensUrlsMap } from '~/store/main/state'

const getters: GetterTree<IMainState, IMainState> = {
  getLoadingStatus: (state): boolean => state.isLoading,
  getTokensUrl: (state): ITokensUrlsMap => state.tokensLogo
}

export default getters
