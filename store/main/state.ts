import { NETWORKS_MAINNET, NETWORKS_TESTNET } from '~/web3/configs/constants'

export interface ITrustwalletToken {
  asset: string,
  type: string,
  address: string,
  name: string,
  symbol: string,
  decimals: number,
  logoURI: string,
  pairs: [],
  chainId?: string,
}

export interface ITokensUrlsMap {
  [key: string]: string | null
}

export interface IToken {
  symbol: string,
  name?: string,
  decimals: string,
  address: string,
  balance?: number | null
}

export interface ITokensMap {
  [key: string]: IToken
}

export interface IMainState {
  isLoading: boolean,
  tokensMap: ITokensMap,
  tokensLogo: ITokensUrlsMap,
  isConnected: boolean,
  userAddress: string,
  chainId: number
}

export const initState = (): IMainState => ({
  isLoading: false,
  tokensMap: {},
  tokensLogo: {},
  isConnected: false,
  userAddress: '',
  chainId: JSON.parse(`${process.env.IS_MAINNET}`) ? NETWORKS_MAINNET.ETH : NETWORKS_TESTNET.ETH
})
console.log('JSON.parse(process.env.IS_MAINNET): ', JSON.parse(`${process.env.IS_MAINNET}`))

export default initState
