import { MutationTree } from 'vuex'
import { IMainState } from '~/store/main/state'

const mutations: MutationTree<IMainState> = {
  setLoading (state, status) {
    state.isLoading = status
  },
  setIsConnected: (state, isConnected: boolean) => {
    state.isConnected = isConnected
  },
  setUserAddress: (state, address: string) => {
    state.userAddress = address
  },
  setChainId: (state, chainId: number) => {
    state.chainId = chainId
  },
  setTokensLogoData (state, payload) {
    state.tokensLogo = payload
  }
}

export default mutations
