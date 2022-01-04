
import { ActionTree } from 'vuex/types/index'
import { IMainState, ITrustwalletToken, ITokensUrlsMap } from '~/store/main/state'

const actions: ActionTree<IMainState, IMainState> = {
  setLoading ({ commit }, status) {
    commit('setLoading', status)
  },
  async fetchTokenUrls ({ commit }) {
    const [
      responseETH,
      responseBSC,
      responseMAT
    ] = await Promise.all([
      fetch('https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/tokenlist.json'),
      fetch('https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/tokenlist.json'),
      fetch('https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/tokenlist.json')
    ])
    const urls: ITokensUrlsMap = {}
    if (responseETH.ok) {
      const { tokens } = await responseETH.json()
      tokens.forEach((item: ITrustwalletToken) => {
        urls[item.symbol.toUpperCase()] = item.logoURI
      })
    }
    if (responseBSC.ok) {
      const { tokens } = await responseBSC.json()
      tokens.forEach((item: ITrustwalletToken) => {
        urls[item.symbol.toUpperCase()] = item.logoURI
      })
    }
    if (responseMAT.ok) {
      const { tokens } = await responseMAT.json()
      tokens.forEach((item: ITrustwalletToken) => {
        urls[item.symbol.toUpperCase()] = item.logoURI
      })
    }
    commit('setTokensLogoData', urls)
  }
}

export default actions
