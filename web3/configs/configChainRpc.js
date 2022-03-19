export const methodSwitchRpcEth = {
  method: 'wallet_switchEthereumChain',
  params: [{
    chainId: '0x1'
  }]
}

export const methodSwitchRpcBscTestnet = {
  method: 'wallet_switchEthereumChain',
  params: [{
    chainId: '0x61'
  }]
}

export const methodSwitchRpcBsc = {
  method: 'wallet_switchEthereumChain',
  params: [{
    chainId: '0x38'
  }]
}

export const methodSwitchRpcMaticTestnet = {
  method: 'wallet_switchEthereumChain',
  params: [{
    chainId: '0x13881'
  }]
}

export const methodSwitchRpcMatic = {
  method: 'wallet_switchEthereumChain',
  params: [{
    chainId: '0x89'
  }]
}

export const methodSwitchEthereumChainRinkeby = {
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0x4' }]
}

export const methodAddRpcBscTestnet = {
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: '0x61',
    chainName: 'BSC Testnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://data-seed-prebsc-1-s3.binance.org:8545'],
    blockExplorerUrls: ['https://testnet.bscscan.com']
  }]
}

export const methodAddRpcBsc = {
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: '0x38',
    chainName: 'BSC',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com']
  }]
}

export const methodAddRpcMaticTestnet = {
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: '0x13881',
    chainName: 'Mumbai Testnet',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'Matic',
      decimals: 18
    },
    rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com/']
  }]
}

export const methodAddRpcMatic = {
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'Matic',
      decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://polygonscan.com']
  }]
}
