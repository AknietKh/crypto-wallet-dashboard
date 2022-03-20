import Web3 from 'web3'
import { error } from './helpers'
import { ANON_PROVIDERS_MAINNET, ANON_PROVIDERS_TESTNET, NETWORKS_MAINNET, NETWORKS_TESTNET } from '~/web3/configs/constants'
import {
  methodSwitchRpcEth,
  methodAddRpcBsc,
  methodAddRpcBscTestnet,
  methodSwitchRpcBscTestnet,
  methodSwitchRpcBsc,
  methodSwitchEthereumChainRinkeby,
  methodAddRpcMaticTestnet,
  methodAddRpcMatic,
  methodSwitchRpcMaticTestnet,
  methodSwitchRpcMatic
} from '~/web3/configs/configChainRpc'

declare global {
  interface Window {
    ethereum?: any
    onNuxtReady?: any
  }
}

export enum PROVIDER_INSTALL_ERROR {
  NO_ANY_WALLET = 460,
  NO_METAMASK = 461,
  NO_COINBASE = 462,
}

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: any;
}

let store: any

if (process.browser) {
  window.onNuxtReady((ctx: any) => {
    store = ctx.$store
  })
}

export default class ConnectionWeb3 {
  private static instance: ConnectionWeb3;
  web3Guest: any = null
  web3Wallet: any = null
  chainId: number | null = null
  isConnected = false
  userAddress = ''

  // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
  private constructor () {}

  // Метод для создания инстанса в единственном экзмеляре (паттерн Singleton)
  public static getInstance (): ConnectionWeb3 {
    if (!ConnectionWeb3.instance) {
      ConnectionWeb3.instance = new ConnectionWeb3()
    }

    return ConnectionWeb3.instance
  }

  // Метод для анонимного подключения к ноде
  public connectAnonProvider (chainId: number): void {
    const providersUrl = JSON.parse(`${process.env.IS_MAINNET}`) ? ANON_PROVIDERS_MAINNET : ANON_PROVIDERS_TESTNET

    const provider = new Web3.providers.HttpProvider(providersUrl[chainId])
    this.web3Guest = new Web3(provider)
  }

  // Подключение к кошельку metamask/coinbase
  public async connectWallet (defaultChain: number, type = 'metamask') : Promise<void> {
    const currentProvider = ConnectionWeb3.getEthereumProvider(type)

    try {
      // unsubscribe to metamask events
      currentProvider.removeListener('chainChanged', this.handleChainChanged)
      currentProvider.removeListener('accountsChanged', this.handleAccountsChanged)
      currentProvider.removeListener('disconnect', this.handleMMDisconnected)
      // subscribe to metamask events
      currentProvider.on('chainChanged', this.handleChainChanged)
      currentProvider.on('accountsChanged', this.handleAccountsChanged)
      currentProvider.on('disconnect', this.handleMMDisconnected)

      this.web3Wallet = new Web3(currentProvider) // init web3

      console.log('currentProvider.isConnected(): ', currentProvider.isConnected())
      if (currentProvider.isConnected()) { // is metamask connected
        await currentProvider.enable() // connect provider wallet
      }

      // get chain id and user address
      [this.userAddress, this.chainId] = await Promise.all([this.web3Wallet.eth.getCoinbase(), this.web3Wallet.eth.net.getId()])
      this.isConnected = true

      if (this.chainId !== defaultChain) {
        await this.changeCurrentMMChain(defaultChain, type)
      }
    } catch (err) {
      console.log('err: ', err)
    }
  }

  // Переключение сетей в метамаске с использованием api метамаска
  public async changeCurrentMMChain (tragetChainID: number, type = 'metamask'): Promise<void> {
    const currentProvider = ConnectionWeb3.getEthereumProvider(type)

    let switchRpcMethod // сигнатура для метода переключения сети в метамаске
    let addRpcMethod // сигнатура для метода добавления сети в метамаск

    if (this.chainId && this.chainId !== tragetChainID) {
      if (tragetChainID === NETWORKS_TESTNET.ETH) {
        try {
          await currentProvider.request(methodSwitchEthereumChainRinkeby)
        } catch (switchError) {
          throw error(400, 'chain connection error')
        }
      } else if (tragetChainID === NETWORKS_TESTNET.BSC) {
        switchRpcMethod = methodSwitchRpcBscTestnet
        addRpcMethod = methodAddRpcBscTestnet
      } else if (tragetChainID === NETWORKS_TESTNET.POLYGON) {
        switchRpcMethod = methodSwitchRpcMaticTestnet
        addRpcMethod = methodAddRpcMaticTestnet
      } else if (tragetChainID === NETWORKS_MAINNET.BSC) {
        switchRpcMethod = methodSwitchRpcBsc
        addRpcMethod = methodAddRpcBsc
      } else if (tragetChainID === NETWORKS_MAINNET.POLYGON) {
        switchRpcMethod = methodSwitchRpcMatic
        addRpcMethod = methodAddRpcMatic
      } else if (tragetChainID === NETWORKS_MAINNET.ETH) {
        try {
          await currentProvider.request(methodSwitchRpcEth)
        } catch (switchError) {
          throw error(400, 'chain connection error')
        }
      }
    }
    if (this.chainId !== +tragetChainID && (tragetChainID !== NETWORKS_TESTNET.ETH && tragetChainID !== NETWORKS_MAINNET.ETH)) {
      try {
        await currentProvider.request(switchRpcMethod)
      } catch (switchError) {
        if ((switchError as ProviderRpcError).code === 4902) {
          try {
            await currentProvider.request(addRpcMethod)
          } catch (addError) {
            throw error(400, 'chain connection error')
          }
        } else if ((switchError as ProviderRpcError).code === 4001) {
          throw error(4001, 'user denied transaction')
        }
      }
    }
    this.chainId = await this.web3Wallet.eth.net.getId()
  }

  private static getEthereumProvider (type: string): any {
    const { ethereum } = window

    let currentProvider = null

    if (ethereum) {
      if (ethereum.providers && ethereum.providers.length) {
        if (type === 'metamask') {
          currentProvider = ethereum.providers?.find((provider: any) => provider.isMetaMask)
          if (!currentProvider) {
            throw error(PROVIDER_INSTALL_ERROR.NO_METAMASK, 'no metamask')
          }
        } else if (type === 'coinbase') {
          currentProvider = ethereum.providers?.find((provider: any) => provider.isCoinbaseWallet)
          if (!currentProvider) {
            throw error(PROVIDER_INSTALL_ERROR.NO_COINBASE, 'no coinbase')
          }
        }
      } else if ((ethereum.isMetaMask && type === 'metamask') || (ethereum.isCoinbaseWallet && type === 'coinbase')) {
        currentProvider = ethereum
      } else if (!ethereum.isMetaMask && type === 'metamask') {
        throw error(PROVIDER_INSTALL_ERROR.NO_METAMASK, 'no metamask')
      } else if (!ethereum.isCoinbaseWallet && type === 'coinbase') {
        throw error(PROVIDER_INSTALL_ERROR.NO_COINBASE, 'no coinbase')
      }
    } else {
      if (type === 'metamask') {
        throw error(PROVIDER_INSTALL_ERROR.NO_METAMASK, 'no metamask')
      }
      if (type === 'coinbase') {
        throw error(PROVIDER_INSTALL_ERROR.NO_COINBASE, 'no coinbase')
      }
    }

    if (!currentProvider) {
      throw error(PROVIDER_INSTALL_ERROR.NO_ANY_WALLET, 'no wallet')
    }

    return currentProvider
  }

  // отписка от ивентов метамаска
  private disconnect (): void {
    const { ethereum } = window
    console.log('Disconnected')

    ethereum.removeListener('chainChanged', this.handleChainChanged)
    ethereum.removeListener('accountsChanged', this.handleAccountsChanged)
    ethereum.removeListener('disconnect', this.handleMMDisconnected)
  }

  // функция обработчик для ивента переключения сети chainChanged
  private handleChainChanged (chainId: string): void {
    const { IS_MAINNET } = process.env
    if (+chainId !== this.chainId) {
      if ((IS_MAINNET === 'false' && NETWORKS_TESTNET[+chainId]) || (IS_MAINNET === 'true' && NETWORKS_MAINNET[+chainId])) {
        this.chainId = +chainId
        store.commit('main/setChainId', +chainId)
        // await this.connectWallet(chainId)
      } else {
        this.disconnect()
      }
    }
  }

  // функция обработчик для ивента переключения счета/аккаунта accountsChanged
  private handleAccountsChanged (account: Array<string>): void {
    console.log('account: ', account)
    if (account.length) {
      [this.userAddress] = account
      store.commit('main/setUserAddress', this.userAddress)
    } else {
      this.disconnect()
    }
  }

  // функция обработчик для ивента disconnect
  private handleMMDisconnected (): void {
    this.disconnect()
  }
}
