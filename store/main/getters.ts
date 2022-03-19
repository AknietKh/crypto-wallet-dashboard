
import { GetterTree } from 'vuex/types/index'
import { IMainState, ITokensMap, ITokensUrlsMap } from '~/store/main/state'

const getters: GetterTree<IMainState, IMainState> = {
  getLoadingStatus: (state): boolean => state.isLoading,
  getTokensUrl: (state): ITokensUrlsMap => state.tokensLogo,
  getIsConnected: (state): boolean => state.isConnected,
  getUserAddress: (state): string => state.userAddress,
  getChainId: (state): number => state.chainId,
  getUserTokensMap: (state): ITokensMap => state.tokensMap
}

export default getters
