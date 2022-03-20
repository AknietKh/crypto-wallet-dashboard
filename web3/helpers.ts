import BigNumber from 'bignumber.js'
import { AbiItem } from 'web3-utils'
import ConnectionWeb3 from './Connection'
// import erc20 from './abis/erc20'

export interface ICustomError extends Error {
  ok: boolean,
  code: number
}

export interface IHelpersArgs {
  address: string,
  method: string,
  params?: Array<any>
  abi: AbiItem[]
}

export interface ITransactionPayload {
  from: string,
  to: string,
  value: string | number
}

export const error = (code: number, msg?: string, _err?: any): void => {
  const err: ICustomError = _err ?? new Error(msg ?? 'custom error')
  err.ok = false
  err.code = code

  throw err
}

export const shiftedBy = (value: string, decimals: string, isShiftedToLeft = true): string => {
  const decimalsInt = isShiftedToLeft ? -parseInt(decimals, 10) : parseInt(decimals, 10)
  return new BigNumber(value).shiftedBy(decimalsInt).toFixed()
}

export const createContractAnonInstance = (abi: Array<AbiItem>, address: string): any => {
  const connection = ConnectionWeb3.getInstance()

  if (!connection.web3Guest) {
    throw new Error('anonymous web3 connection not initizlized')
  }

  return new connection.web3Guest.eth.Contract(abi, address)
}

export const createContractWalletInstance = (abi: Array<AbiItem>, address: string): any => {
  const connection = ConnectionWeb3.getInstance()

  if (!connection.web3Wallet) {
    throw new Error('wallet web3 connection not initizlized')
  }

  return new connection.web3Wallet.eth.Contract(abi, address)
}

export const fetchContractData = async ({ address, method, params, abi }: IHelpersArgs): Promise<any> => {
  const instance : any = createContractAnonInstance(abi, address)
  const tx = await instance.methods[method].apply(this, params).call()
  return tx
}

export const fetchContractDataByWallet = async ({ address, method, params, abi }: IHelpersArgs): Promise<any> => {
  const instance : any = createContractWalletInstance(abi, address)
  const tx = await instance.methods[method].apply(this, params).call()
  return tx
}

export const sendDataToContract = async ({ address, method, params, abi }: IHelpersArgs, userAddress: string): Promise<any> => {
  const instance : any = createContractWalletInstance(abi, address)
  const tx = await instance.methods[method].apply(this, params).send({ from: userAddress })
  return tx
}

export const sendTransaction = async ({ from, to, value }: ITransactionPayload): Promise<any> => {
  const connection = ConnectionWeb3.getInstance()
  const tx = await connection.web3Wallet.eth.sendTransaction({ from, to, value })
  return tx
}

export const getFee = async ({ address, method, params, abi }: IHelpersArgs, userAddress: string): Promise<string> => {
  const contract: any = createContractWalletInstance(abi, address)
  const connection = ConnectionWeb3.getInstance()
  const [
    gasPrice,
    estimateGas
  ] = await Promise.all([
    connection.web3Guest.eth.getGasPrice(),
    contract.methods[method].apply(this, params).estimateGas({ from: userAddress })
  ])

  return connection.web3Guest.utils.fromWei(new BigNumber(gasPrice).multipliedBy(estimateGas).toFixed())
}

export const getBalanceNativeToken = async (userAddress: string): Promise<string> => {
  const { web3Wallet } = ConnectionWeb3.getInstance()
  const balance = await web3Wallet.eth.getBalance(userAddress)
  return balance
}

// EVENTS
type eventPayload = { abi: AbiItem[], address: string, userAddress: string }
type eventCallback = (err: any, data: any) => void

export const subscribeToContractEvents = ({ abi, address, userAddress }: eventPayload, cb: eventCallback) => {
  const instance = createContractWalletInstance(abi, address)
  const filter = {
    sender: [userAddress]
  }

  instance.events.allEvents({ filter, fromBlock: 0 }, (err: any, data: any) => {
    console.log('err, data: ', err, data)
    cb(err, data)
  })
    .on('data', (ev: any) => {
      console.log('ev: ', ev)
    })
    .on('error', (err: any) => {
      console.log('subscribeToEvents', err)
    })
}
