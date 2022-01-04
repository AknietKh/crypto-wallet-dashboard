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
  [key: string]: string | null | undefined
}

export interface IMainState {
  isLoading: boolean,
  userTokens: object,
  tokensLogo: ITokensUrlsMap,
}

export const initState = (): IMainState => ({
  isLoading: true,
  userTokens: {},
  tokensLogo: {}
})

export default initState
