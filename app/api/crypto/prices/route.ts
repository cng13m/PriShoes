import { NextResponse } from "next/server"

// Mock crypto prices - in production, fetch from real APIs
const getCryptoPrices = async () => {
  try {
    // This would typically call CoinGecko or Binance API
    // For now, we'll return mock data
    const prices = {
      SOL: 245.5,
      BTC: 44500.0,
      ETH: 2380.5,
      LTC: 110.25,
      timestamp: new Date().toISOString(),
    }
    return prices
  } catch (error) {
    return {
      SOL: 245.5,
      BTC: 44500.0,
      ETH: 2380.5,
      LTC: 110.25,
      timestamp: new Date().toISOString(),
    }
  }
}

export async function GET() {
  const prices = await getCryptoPrices()
  return NextResponse.json(prices)
}
