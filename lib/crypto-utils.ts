// Utility functions for crypto price conversion and formatting

export const convertUsdToCrypto = (usdAmount: number, cryptoPrice: number) => {
  return usdAmount / cryptoPrice
}

export const convertCryptoToUsd = (cryptoAmount: number, cryptoPrice: number) => {
  return cryptoAmount * cryptoPrice
}

export const formatCryptoAmount = (amount: number, decimals = 4) => {
  return amount.toFixed(decimals)
}

export const formatUsdAmount = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

// Supported crypto currencies
export const SUPPORTED_CRYPTOS = {
  SOL: { name: "Solana", symbol: "SOL", decimals: 9 },
  BTC: { name: "Bitcoin", symbol: "BTC", decimals: 8 },
  ETH: { name: "Ethereum", symbol: "ETH", decimals: 18 },
  LTC: { name: "Litecoin", symbol: "LTC", decimals: 8 },
}

export const WALLET_TYPES = {
  PHANTOM: "phantom",
  METMASK: "metmask",
  WALLETCONNECT: "walletconnect",
  COINBASE: "coinbase_wallet",
}
