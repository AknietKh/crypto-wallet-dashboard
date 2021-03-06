import { MutationTree } from 'vuex'
import { IMainState, IToken, ITokensMap } from '~/store/main/state'

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
  setUserTokens (state, tokensMap: ITokensMap) {
    state.tokensMap = tokensMap
  },
  addUserToken (state, { token, chainId }:{token: IToken, chainId: number}) {
    const copy = JSON.parse(JSON.stringify(state.tokensMap))
    copy[token.address] = token
    state.tokensMap = copy
    localStorage.setItem(`tokens-${chainId}`, JSON.stringify(copy))
  },
  updateAllTokensBalance (state, tokens: IToken[]) {
    tokens.forEach((token) => {
      state.tokensMap[token.address].balance = token.balance
    })
  },
  updateTokenBalance (state, { token, balance }: {token: IToken, balance: number}) {
    state.tokensMap[token.address].balance = +balance
  },
  setTokensLogoData (state, payload) {
    state.tokensLogo = payload
  }
}

export default mutations
