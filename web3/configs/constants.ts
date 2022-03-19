import { IToken } from '~/store/main/state'

export enum NETWORKS_TESTNET {
  ETH = 4,
  BSC = 97,
  POLYGON = 80001
}

export enum NETWORKS_MAINNET {
  ETH = 1,
  BSC = 56,
  POLYGON = 137,
}

export const NATIVE_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000000'

export type AnonProviders = {
  [key: number]: string
}
export const ANON_PROVIDERS_TESTNET: AnonProviders = {
  [NETWORKS_TESTNET.ETH]: `https://rinkeby.infura.io/v3/${process.env.INFURA_API}`,
  [NETWORKS_TESTNET.BSC]: 'https://data-seed-prebsc-1-s2.binance.org:8545',
  [NETWORKS_TESTNET.POLYGON]: 'https://matic-mumbai.chainstacklabs.com'
}

export const ANON_PROVIDERS_MAINNET: AnonProviders = {
  [NETWORKS_MAINNET.ETH]: `https://mainnet.infura.io/v3/${process.env.INFURA_API}`,
  [NETWORKS_MAINNET.BSC]: 'https://bsc-dataseed.binance.org',
  [NETWORKS_MAINNET.POLYGON]: 'https://polygon-rpc.com'
}

export type NativeTokenList = {
  [key: string]: IToken
}

export const NATIVE_TOKENS_LIST: NativeTokenList = {
  ETH: {
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
    balance: null
  },
  BSC: {
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    name: 'Binance Coin',
    symbol: 'BNB',
    balance: null
  },
  POLYGON: {
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    name: 'Polygon (MATIC)',
    symbol: 'MATIC',
    balance: null
  }
}
