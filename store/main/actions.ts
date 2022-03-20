
import { ActionTree } from 'vuex/types/index'
import { IMainState, ITrustwalletToken, ITokensUrlsMap, IToken } from '~/store/main/state'
import { NATIVE_TOKENS_LIST, NATIVE_TOKEN_ADDRESS, NETWORKS_MAINNET, NETWORKS_TESTNET } from '~/web3/configs/constants'
import ConnectionWeb3 from '~/web3/Connection'
import { fetchContractData, getBalanceNativeToken, shiftedBy } from '~/web3/helpers'
import ERC20 from '~/web3/abis/erc20'

const actions: ActionTree<IMainState, IMainState> = {
  setLoading ({ commit }, status) {
    commit('setLoading', status)
  },
  connectNode ({ getters }) {
    const chainId = getters.getChainId
    const connection = ConnectionWeb3.getInstance()

    connection.connectAnonProvider(chainId)
  },
  async connectWallet ({ getters, commit }) {
    const connection = ConnectionWeb3.getInstance()
    const chainId = getters.getChainId

    await connection.connectWallet(chainId, 'metamask')

    commit('setUserAddress', connection.userAddress)
    commit('setChainId', connection.chainId)
    commit('setIsConnected', connection.isConnected)
  },
  setUserTokens ({ getters, commit }) {
    const chainId = getters.getChainId
    const tokens = localStorage.getItem(`tokens-${chainId}`)
    console.log('tokens: ', tokens)

    if (!tokens || !Object.keys(tokens).length) {
      const currentChainName = JSON.parse(`${process.env.IS_MAINNET}`) ? NETWORKS_MAINNET[chainId] : NETWORKS_TESTNET[chainId]
      const nativeToken = NATIVE_TOKENS_LIST[currentChainName]

      localStorage.setItem(`tokens-${chainId}`, JSON.stringify({ [nativeToken.address]: nativeToken }))
      commit('setUserTokens', { [nativeToken.address]: nativeToken })
      return
    }

    commit('setUserTokens', JSON.parse(tokens))
  },
  async updateAllTokensBalance ({ getters, commit }) {
    const userAddress = getters.getUserAddress
    const tokens: IToken[] = Object.values(getters.getTokensMap)

    const updatedTokens = await Promise.all(tokens.map(async (token) => {
      let balance = '0'

      if (token.address === NATIVE_TOKEN_ADDRESS) {
        balance = await getBalanceNativeToken(userAddress)
      } else {
        balance = await fetchContractData({ address: token.address, abi: ERC20, method: 'balanceOf', params: [userAddress] })
      }

      // eslint-disable-next-line no-param-reassign
      token.balance = +shiftedBy(balance, token.decimals.toString())
      return token
    }))

    commit('updateAllTokensBalance', updatedTokens)
  },
  async updateTokenBalance ({ getters, commit }, token: IToken) {
    const userAddress = getters.getUserAddress

    let balance = '0'

    if (token.address === NATIVE_TOKEN_ADDRESS) {
      balance = await getBalanceNativeToken(userAddress)
    } else {
      balance = await fetchContractData({ address: token.address, abi: ERC20, method: 'balanceOf', params: [userAddress] })
    }
    // eslint-disable-next-line no-param-reassign
    balance = shiftedBy(balance, token.decimals.toString())

    commit('updateTokenBalance', { token, balance })
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
