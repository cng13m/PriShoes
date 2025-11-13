"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { User, Settings, LogOut, Plus, Eye, EyeOff, History } from "lucide-react"

const userProfile = {
  username: "sneaker_collector",
  email: "user@example.com",
  walletAddress: "0x742d...8c8a",
  walletType: "Phantom",
  bio: "Sneaker enthusiast. Always looking for rare drops.",
  joinDate: "January 2024",
  totalSpent: 12500,
  totalListings: 8,
  profileImage: "/placeholder.svg?key=profile",
}

const userBids = [
  { id: 1, sneaker: "Air Jordan 1 Retro", brand: "Nike", bidAmount: 1200, status: "active", createdAt: "2 days ago" },
  { id: 2, sneaker: "Yeezy 350 V2", brand: "Adidas", bidAmount: 400, status: "active", createdAt: "5 days ago" },
  { id: 3, sneaker: "Travis Scott AJ1", brand: "Jordan", bidAmount: 2600, status: "accepted", createdAt: "1 week ago" },
]

const userListings = [
  { id: 1, sneaker: "New Balance 990v6", brand: "New Balance", askPrice: 280, bids: 3, views: 145, status: "active" },
  { id: 2, sneaker: "Dunk Low Pro", brand: "Nike", askPrice: 180, bids: 1, views: 89, status: "active" },
  { id: 3, sneaker: "Sacai Waffle", brand: "Nike", askPrice: 320, bids: 0, views: 234, status: "sold" },
]

const purchaseHistory = [
  { id: 1, sneaker: "Air Max 90", date: "2024-01-15", amount: 150, crypto: "0.62 SOL", status: "completed" },
  { id: 2, sneaker: "Jordan 3 Retro", date: "2024-01-10", amount: 1100, crypto: "4.48 SOL", status: "completed" },
  { id: 3, sneaker: "Balenciaga Triple S", date: "2024-01-05", amount: 950, crypto: "3.87 SOL", status: "completed" },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "bids" | "listings" | "history" | "settings">("overview")
  const [privateMode, setPrivateMode] = useState(false)
  const [showWallet, setShowWallet] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Dashboard Header */}
      <div className="border-b border-border bg-primary/20 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <div className="h-20 w-20 rounded-full bg-accent/20 overflow-hidden border-2 border-accent">
                <img
                  src={userProfile.profileImage || "/placeholder.svg"}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">@{userProfile.username}</h1>
                <p className="text-muted-foreground">Member since {userProfile.joinDate}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Edit Profile
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90">
                <Plus className="mr-2 h-4 w-4" />
                List Sneakers
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-2 rounded-lg bg-card p-4 sticky top-4">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full rounded-lg px-4 py-3 text-left font-medium transition ${
                    activeTab === "overview"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Overview</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("bids")}
                  className={`w-full rounded-lg px-4 py-3 text-left font-medium transition ${
                    activeTab === "bids"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary"
                  }`}
                >
                  My Bids ({userBids.length})
                </button>
                <button
                  onClick={() => setActiveTab("listings")}
                  className={`w-full rounded-lg px-4 py-3 text-left font-medium transition ${
                    activeTab === "listings"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary"
                  }`}
                >
                  My Listings ({userListings.length})
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`w-full rounded-lg px-4 py-3 text-left font-medium transition ${
                    activeTab === "history"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <History className="h-4 w-4" />
                    <span>Purchase History</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full rounded-lg px-4 py-3 text-left font-medium transition ${
                    activeTab === "settings"
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  {/* Stats */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-lg bg-card p-6 border border-border">
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="mt-2 text-3xl font-bold text-foreground">${userProfile.totalSpent}</p>
                      <p className="mt-1 text-xs text-accent">~{(userProfile.totalSpent / 240).toFixed(2)} SOL</p>
                    </div>
                    <div className="rounded-lg bg-card p-6 border border-border">
                      <p className="text-sm text-muted-foreground">Active Bids</p>
                      <p className="mt-2 text-3xl font-bold text-foreground">
                        {userBids.filter((b) => b.status === "active").length}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">Waiting for acceptance</p>
                    </div>
                    <div className="rounded-lg bg-card p-6 border border-border">
                      <p className="text-sm text-muted-foreground">Active Listings</p>
                      <p className="mt-2 text-3xl font-bold text-foreground">
                        {userListings.filter((l) => l.status === "active").length}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">Available for sale</p>
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="space-y-4 rounded-lg bg-card p-6 border border-border">
                    <h2 className="text-xl font-bold text-foreground">Profile Information</h2>

                    <div className="space-y-3 border-t border-border pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Email</span>
                        <span className="font-medium text-foreground">{userProfile.email}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Bio</span>
                        <span className="font-medium text-foreground text-right max-w-xs">{userProfile.bio}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Wallet</span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm text-foreground">
                            {showWallet ? userProfile.walletAddress : "••••••••••••••"}
                          </span>
                          <button onClick={() => setShowWallet(!showWallet)}>
                            {showWallet ? (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bids Tab */}
              {activeTab === "bids" && (
                <div className="space-y-4 rounded-lg bg-card p-6 border border-border">
                  <h2 className="text-xl font-bold text-foreground">My Bids</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b border-border">
                        <tr>
                          <th className="px-4 py-3 text-left text-muted-foreground font-medium">Sneaker</th>
                          <th className="px-4 py-3 text-left text-muted-foreground font-medium">Bid Amount</th>
                          <th className="px-4 py-3 text-left text-muted-foreground font-medium">Status</th>
                          <th className="px-4 py-3 text-left text-muted-foreground font-medium">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {userBids.map((bid) => (
                          <tr key={bid.id} className="hover:bg-primary/50 transition">
                            <td className="px-4 py-3">
                              <div>
                                <p className="font-medium text-foreground">{bid.sneaker}</p>
                                <p className="text-xs text-muted-foreground">{bid.brand}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-foreground font-semibold">${bid.bidAmount}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                  bid.status === "active"
                                    ? "bg-accent/20 text-accent"
                                    : "bg-green-500/20 text-green-400"
                                }`}
                              >
                                {bid.status === "active" ? "Active" : "Accepted"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground">{bid.createdAt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Listings Tab */}
              {activeTab === "listings" && (
                <div className="space-y-4">
                  {userListings.map((listing) => (
                    <div key={listing.id} className="rounded-lg bg-card p-6 border border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{listing.sneaker}</p>
                          <p className="text-sm text-muted-foreground">{listing.brand}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-accent">${listing.askPrice}</p>
                          <p className="text-xs text-muted-foreground">
                            {listing.status === "sold" ? "SOLD" : "Active"}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-4 border-t border-border pt-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Bids Received</p>
                          <p className="font-semibold text-foreground">{listing.bids}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Views</p>
                          <p className="font-semibold text-foreground">{listing.views}</p>
                        </div>
                        <div className="ml-auto">
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Purchase History Tab */}
              {activeTab === "history" && (
                <div className="space-y-4 rounded-lg bg-card p-6 border border-border">
                  <h2 className="text-xl font-bold text-foreground">Purchase History</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="border-b border-border">
                        <tr>
                          <th className="px-4 py-3 text-left text-muted-foreground font-medium">Sneaker</th>
                          <th className="px-4 py-3 text-left text-muted-foreground font-medium">Date</th>
                          <th className="px-4 py-3 text-left text-muted-foreground font-medium">Amount</th>
                          <th className="px-4 py-3 text-left text-muted-foreground font-medium">Crypto</th>
                          <th className="px-4 py-3 text-left text-muted-foreground font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {purchaseHistory.map((purchase) => (
                          <tr key={purchase.id} className="hover:bg-primary/50 transition">
                            <td className="px-4 py-3 font-medium text-foreground">{purchase.sneaker}</td>
                            <td className="px-4 py-3 text-muted-foreground">{purchase.date}</td>
                            <td className="px-4 py-3 text-foreground font-semibold">${purchase.amount}</td>
                            <td className="px-4 py-3 text-accent font-mono text-xs">{purchase.crypto}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                                {purchase.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="space-y-4 rounded-lg bg-card p-6 border border-border">
                    <h2 className="text-xl font-bold text-foreground">Privacy Settings</h2>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-foreground">Private Mode</p>
                          <p className="text-sm text-muted-foreground">
                            Hide your wallet and purchase history from public profile
                          </p>
                        </div>
                        <button
                          onClick={() => setPrivateMode(!privateMode)}
                          className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                            privateMode ? "bg-accent" : "bg-primary"
                          }`}
                        >
                          <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-background transition ${
                              privateMode ? "translate-x-7" : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-lg bg-card p-6 border border-border">
                    <h2 className="text-xl font-bold text-foreground">Danger Zone</h2>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <LogOut className="mr-2 h-4 w-4" />
                      Disconnect Wallet
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
