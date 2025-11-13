"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ChevronRight, TrendingUp } from "lucide-react"
import Link from "next/link"

const featuredSneakers = [
  {
    id: 1,
    name: "Air Jordan 1 Retro",
    brand: "Nike",
    image: "/air-jordan-1-red-sneaker.jpg",
    lowestAsk: "$1,250",
    highestBid: "$1,180",
    solanaPriceAsk: "5.2 SOL",
    solanaPriceBid: "4.9 SOL",
    trending: true,
  },
  {
    id: 2,
    name: "Yeezy 350 V2",
    brand: "Adidas",
    image: "/yeezy-350-sneaker.jpg",
    lowestAsk: "$420",
    highestBid: "$385",
    solanaPriceAsk: "1.75 SOL",
    solanaPriceBid: "1.6 SOL",
    trending: true,
  },
  {
    id: 3,
    name: "New Balance 990v6",
    brand: "New Balance",
    image: "/new-balance-990-sneaker.jpg",
    lowestAsk: "$280",
    highestBid: "$250",
    solanaPriceAsk: "1.17 SOL",
    solanaPriceBid: "1.04 SOL",
    trending: false,
  },
  {
    id: 4,
    name: "Dunks Low Pro",
    brand: "Nike",
    image: "/nike-dunk-low-sneaker.jpg",
    lowestAsk: "$180",
    highestBid: "$160",
    solanaPriceAsk: "0.75 SOL",
    solanaPriceBid: "0.67 SOL",
    trending: true,
  },
]

const transactions = [
  { id: 1, sneaker: "Jordan 1 Retro", amount: "5.0 SOL", buyer: "User...3f4a", time: "2 min ago" },
  { id: 2, sneaker: "Yeezy 350 V2", amount: "1.5 SOL", buyer: "User...8k2l", time: "15 min ago" },
  { id: 3, sneaker: "Dunk Low", amount: "0.7 SOL", buyer: "User...5m9n", time: "42 min ago" },
  { id: 4, sneaker: "New Balance 990", amount: "1.1 SOL", buyer: "User...7p2q", time: "1 hour ago" },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative border-b border-border bg-gradient-to-b from-primary/20 to-background px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-accent">Trending Now</span>
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Trade Rare Sneakers
            <span className="text-accent"> Privately</span>
          </h1>
          <p className="mt-6 text-balance text-lg text-muted-foreground">
            Buy, sell, and bid on premium sneakers with crypto. Solana, Bitcoin, Ethereum, Litecoin—complete privacy,
            complete control.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90">
              Explore Sneakers
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Sneakers */}
      <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Featured Listings</h2>
              <p className="mt-2 text-muted-foreground">Most active sneakers on the platform</p>
            </div>
            <Link href="/browse">
              <Button variant="ghost">
                View All
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredSneakers.map((sneaker) => (
              <Link key={sneaker.id} href={`/sneakers/${sneaker.id}`}>
                <div className="group cursor-pointer overflow-hidden rounded-xl bg-card transition-all hover:shadow-lg">
                  <div className="relative aspect-square overflow-hidden bg-primary">
                    <img
                      src={sneaker.image || "/placeholder.svg"}
                      alt={sneaker.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {sneaker.trending && (
                      <div className="absolute top-3 right-3 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-accent-foreground">
                        Trending
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{sneaker.brand}</p>
                    <h3 className="mt-1 font-semibold text-foreground">{sneaker.name}</h3>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Lowest Ask</span>
                        <span className="font-semibold text-foreground">{sneaker.lowestAsk}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Highest Bid</span>
                        <span className="font-semibold text-accent">{sneaker.highestBid}</span>
                      </div>
                      <div className="border-t border-border pt-2">
                        <span className="text-xs text-muted-foreground">in SOL</span>
                        <p className="text-sm font-medium text-foreground">{sneaker.solanaPriceAsk}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live Transactions Feed */}
      <section className="border-b border-border px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-3xl font-bold text-foreground">Live Activity</h2>
          <div className="overflow-hidden rounded-xl bg-card">
            <div className="divide-y divide-border">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between border-b border-border p-4 last:border-0 transition-colors hover:bg-primary/50"
                >
                  <div>
                    <p className="font-medium text-foreground">{tx.sneaker}</p>
                    <p className="text-sm text-muted-foreground">{tx.buyer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-accent">{tx.amount}</p>
                    <p className="text-xs text-muted-foreground">{tx.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-bold text-foreground">PriShoes</h3>
              <p className="mt-2 text-sm text-muted-foreground">Private sneaker marketplace powered by crypto.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Explore</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/browse" className="text-sm text-muted-foreground hover:text-foreground">
                    Browse
                  </Link>
                </li>
                <li>
                  <Link href="/trending" className="text-sm text-muted-foreground hover:text-foreground">
                    Trending
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Resources</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-sm text-muted-foreground hover:text-foreground">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Legal</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2025 PriShoes. All rights reserved. Trade privately, trade crypto.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
