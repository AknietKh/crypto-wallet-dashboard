
import { GetterTree } from 'vuex/types/index'
import { IMainState, ITokensUrlsMap } from '~/store/main/state'

const getters: GetterTree<IMainState, IMainState> = {
  getIsLoading: (state): boolean => state.isLoading,
  getTokensUrl: (state): ITokensUrlsMap => state.tokensLogo,
  getIsConnected: (state): boolean => state.isConnected,
  getUserAddress: (state): string => state.userAddress,
  getChainId: (state): number => state.chainId
}

export default getters
