"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Heart, Share2, MessageSquare } from "lucide-react"
import Link from "next/link"

const sneakerDetails = {
  1: {
    name: "Air Jordan 1 Retro",
    brand: "Nike",
    releaseDate: "November 2024",
    price: 1250,
    solanaPrice: 5.2,
    bitcoinPrice: 0.028,
    ethereumPrice: 0.35,
    image: "/placeholder.svg?key=aj1detail",
    description:
      "The timeless Air Jordan 1 Retro continues to dominate sneaker culture with its iconic silhouette and premium craftsmanship. This release features original colorway with authentic materials.",
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "13"],
    condition: "New",
    lowestAsk: 1250,
    highestBid: 1180,
    bidCount: 43,
    askCount: 12,
    recentSales: [
      { price: 1240, date: "2 hours ago" },
      { price: 1255, date: "5 hours ago" },
      { price: 1230, date: "1 day ago" },
    ],
    related: [
      { id: 2, name: "Air Jordan 1 Low", price: 850, image: "/placeholder.svg?key=aj1low" },
      { id: 3, name: "Jordan 2 Retro", price: 950, image: "/placeholder.svg?key=aj2" },
      { id: 4, name: "Jordan 3 Retro", price: 1100, image: "/placeholder.svg?key=aj3" },
    ],
  },
}

export default function SneakerPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [actionTab, setActionTab] = useState<"buy" | "bid">("buy")
  const sneaker = sneakerDetails[1 as keyof typeof sneakerDetails]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="border-b border-border px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Browse
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left: Image & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Product Image */}
              <div className="overflow-hidden rounded-xl bg-primary">
                <img
                  src={sneaker.image || "/placeholder.svg"}
                  alt={sneaker.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm uppercase tracking-wide text-muted-foreground">{sneaker.brand}</p>
                  <h1 className="text-3xl font-bold text-foreground">{sneaker.name}</h1>
                  <p className="mt-2 text-muted-foreground">{sneaker.releaseDate}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">Description</h3>
                  <p className="text-muted-foreground">{sneaker.description}</p>
                </div>

                {/* Size Selection */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Select Size</h3>
                  <div className="grid gap-2 sm:grid-cols-4">
                    {sneaker.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`rounded-lg border py-3 text-center font-medium transition ${
                          selectedSize === size
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-border text-foreground hover:border-accent hover:bg-primary"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Market Data */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-card p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Lowest Ask</p>
                    <p className="mt-2 text-2xl font-bold text-foreground">${sneaker.lowestAsk}</p>
                    <p className="mt-1 text-xs text-accent">{sneaker.askCount} listing(s)</p>
                  </div>
                  <div className="rounded-lg bg-card p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Highest Bid</p>
                    <p className="mt-2 text-2xl font-bold text-accent">${sneaker.highestBid}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{sneaker.bidCount} bid(s)</p>
                  </div>
                  <div className="rounded-lg bg-card p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Ask/Bid Spread</p>
                    <p className="mt-2 text-2xl font-bold text-foreground">
                      {(((sneaker.lowestAsk - sneaker.highestBid) / sneaker.highestBid) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Purchase Actions */}
            <div className="space-y-6">
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="flex-1 bg-transparent">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="flex-1 bg-transparent">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="flex-1 bg-transparent">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>

              {/* Buy/Bid Toggle */}
              <div className="inline-flex gap-1 rounded-lg bg-card p-1 w-full">
                <button
                  onClick={() => setActionTab("buy")}
                  className={`flex-1 rounded px-4 py-2 font-medium transition ${
                    actionTab === "buy"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Buy Now
                </button>
                <button
                  onClick={() => setActionTab("bid")}
                  className={`flex-1 rounded px-4 py-2 font-medium transition ${
                    actionTab === "bid"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Place Bid
                </button>
              </div>

              {/* Price Conversion Card */}
              <div className="space-y-3 rounded-lg bg-card p-4">
                <h3 className="font-semibold text-foreground">Price in Crypto</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Solana (SOL)</span>
                    <span className="font-semibold text-foreground">{sneaker.solanaPrice.toFixed(2)} SOL</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Bitcoin (BTC)</span>
                    <span className="font-semibold text-foreground">{sneaker.bitcoinPrice.toFixed(4)} BTC</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Ethereum (ETH)</span>
                    <span className="font-semibold text-foreground">{sneaker.ethereumPrice.toFixed(3)} ETH</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Prices updated in real-time</p>
              </div>

              {/* Action Form */}
              <div className="space-y-4 rounded-lg border border-border bg-primary/20 p-4">
                {actionTab === "buy" ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-foreground">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        defaultValue="1"
                        className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground"
                      />
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90">Buy for ${sneaker.lowestAsk}</Button>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-foreground">Bid Amount (USD)</label>
                      <input
                        type="number"
                        placeholder={`Max: $${sneaker.lowestAsk}`}
                        className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-foreground"
                      />
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/90">Place Bid</Button>
                  </>
                )}
              </div>

              {/* Recent Sales */}
              <div className="space-y-3 rounded-lg bg-card p-4">
                <h3 className="font-semibold text-foreground">Recent Sales</h3>
                <div className="space-y-2">
                  {sneaker.recentSales.map((sale, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">${sale.price}</span>
                      <span className="text-xs text-muted-foreground">{sale.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Sneakers */}
          <div className="mt-16 border-t border-border pt-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Related Sneakers</h2>
            <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {sneaker.related.map((item) => (
                <Link key={item.id} href={`/sneakers/${item.id}`}>
                  <div className="group cursor-pointer overflow-hidden rounded-xl bg-card transition-all hover:shadow-lg border border-border hover:border-accent">
                    <div className="aspect-square overflow-hidden bg-primary">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground line-clamp-2">{item.name}</h3>
                      <p className="mt-2 font-bold text-accent">${item.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
