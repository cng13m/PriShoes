"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
import { ChevronLeft, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"

const MOCK_ITEM = {
  id: 1,
  name: "Air Jordan 1 Retro",
  price: 1250,
  brand: "Nike",
}

const CRYPTO_OPTIONS = [
  { symbol: "SOL", name: "Solana", rate: 245.5, fee: 0.00025 },
  { symbol: "BTC", name: "Bitcoin", rate: 44500.0, fee: 0.0002 },
  { symbol: "ETH", name: "Ethereum", rate: 2380.5, fee: 0.005 },
  { symbol: "LTC", name: "Litecoin", rate: 110.25, fee: 0.001 },
]

export default function CheckoutPage() {
  const [selectedCrypto, setSelectedCrypto] = useState("SOL")
  const [connectedWallet, setConnectedWallet] = useState<string>("")
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [txHash, setTxHash] = useState("")

  const selectedOption = CRYPTO_OPTIONS.find((opt) => opt.symbol === selectedCrypto)!
  const cryptoAmount = MOCK_ITEM.price / selectedOption.rate
  const fee = cryptoAmount * selectedOption.fee
  const total = cryptoAmount + fee

  const handleCheckout = async () => {
    if (!connectedWallet) {
      alert("Please connect your wallet first")
      return
    }

    setStatus("processing")
    try {
      const response = await fetch(`/api/checkout/${selectedCrypto.toLowerCase()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          usdAmount: MOCK_ITEM.price,
          buyerWallet: connectedWallet,
          itemId: MOCK_ITEM.id,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setTxHash(data.id)
        setStatus("success")
      } else {
        setStatus("error")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-md">
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <CheckCircle2 className="mx-auto h-16 w-16 text-accent" />
              <h1 className="mt-4 text-2xl font-bold text-foreground">Payment Submitted!</h1>
              <p className="mt-2 text-muted-foreground">Your transaction is being processed</p>
              <div className="mt-4 rounded-lg bg-primary/50 p-3">
                <p className="text-xs text-muted-foreground">Transaction ID</p>
                <p className="font-mono text-sm text-foreground break-all">{txHash}</p>
              </div>
              <Button className="mt-6 w-full bg-accent hover:bg-accent/90">View Transaction</Button>
              <Link href="/browse">
                <Button variant="outline" className="mt-3 w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="border-b border-border px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Sneakers
          </Link>
        </div>
      </div>

      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-foreground">Checkout</h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Order Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Item Summary */}
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="font-semibold text-foreground">Order Summary</h2>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{MOCK_ITEM.brand}</p>
                    <p className="font-semibold text-foreground">{MOCK_ITEM.name}</p>
                  </div>
                  <p className="text-lg font-bold text-foreground">${MOCK_ITEM.price}</p>
                </div>
              </div>

              {/* Cryptocurrency Selection */}
              <div className="space-y-4 rounded-lg border border-border bg-card p-6">
                <h2 className="font-semibold text-foreground">Select Payment Method</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {CRYPTO_OPTIONS.map((option) => (
                    <button
                      key={option.symbol}
                      onClick={() => setSelectedCrypto(option.symbol)}
                      className={`rounded-lg border p-4 text-left transition ${
                        selectedCrypto === option.symbol
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-accent hover:bg-primary"
                      }`}
                    >
                      <p className="font-semibold text-foreground">{option.name}</p>
                      <p className="text-xs text-muted-foreground">${option.rate.toFixed(2)}</p>
                      <p className="mt-2 text-sm text-accent">
                        {(MOCK_ITEM.price / option.rate).toFixed(6)} {option.symbol}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wallet Connection */}
              <div className="space-y-4 rounded-lg border border-border bg-card p-6">
                <h2 className="font-semibold text-foreground">Connect Wallet</h2>
                <WalletConnect onConnect={(wallet, address) => setConnectedWallet(address)} />
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4">
              <div className="sticky top-4 space-y-4 rounded-lg border border-border bg-card p-6">
                <h3 className="font-semibold text-foreground">Price Breakdown</h3>

                <div className="space-y-2 border-t border-border pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${MOCK_ITEM.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Exchange Rate</span>
                    <span className="text-foreground">
                      1 {selectedCrypto} = ${selectedOption.rate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Crypto Amount</span>
                    <span className="text-foreground">
                      {cryptoAmount.toFixed(6)} {selectedCrypto}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Network Fee</span>
                    <span className="text-accent">
                      {fee.toFixed(8)} {selectedCrypto}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold text-accent">
                      {total.toFixed(8)} {selectedCrypto}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={status === "processing" || !connectedWallet}
                  className="w-full bg-accent hover:bg-accent/90"
                >
                  {status === "processing" ? "Processing..." : "Complete Purchase"}
                </Button>

                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span className="text-sm text-destructive">Payment failed. Try again.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
