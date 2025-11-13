import { type NextRequest, NextResponse } from "next/server"

// Mock Solana Pay integration
// In production, use: https://github.com/solana-labs/solana-pay
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, usdAmount, buyerWallet, itemId } = body

    if (!amount || !usdAmount || !buyerWallet || !itemId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In production, this would:
    // 1. Create a transaction signature
    // 2. Generate a QR code for mobile scanning
    // 3. Store pending transaction in database

    const transaction = {
      id: `tx_${Date.now()}`,
      status: "pending",
      amount: amount,
      usdAmount: usdAmount,
      currency: "SOL",
      itemId: itemId,
      buyerWallet: buyerWallet,
      createdAt: new Date().toISOString(),
      // In production, this would be a real Solana transaction signature
      transactionUrl: `https://solscan.io/tx/mock_${Date.now()}`,
    }

    return NextResponse.json(transaction)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}
