"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart3, Users, ShoppingCart, Wallet, TrendingUp, Plus, Search, Eye, Trash2, Edit } from "lucide-react"

const adminStats = [
  { label: "Total Users", value: "1,842", change: "+12%", icon: Users },
  { label: "Total Sales", value: "$128,450", change: "+8.2%", icon: ShoppingCart },
  { label: "Crypto Volume", value: "234.5 SOL", change: "+15.3%", icon: Wallet },
  { label: "Active Listings", value: "892", change: "-2%", icon: TrendingUp },
]

const sneakersData = [
  { id: 1, name: "Air Jordan 1 Retro", brand: "Nike", price: 1250, listings: 12, bids: 43, status: "active" },
  { id: 2, name: "Yeezy 350 V2", brand: "Adidas", price: 420, listings: 8, bids: 28, status: "active" },
  { id: 3, name: "New Balance 990v6", brand: "New Balance", price: 280, listings: 15, bids: 52, status: "active" },
  { id: 4, name: "Dunk Low Pro", brand: "Nike", price: 180, listings: 23, bids: 67, status: "active" },
  { id: 5, name: "Travis Scott AJ1", brand: "Jordan", price: 2800, listings: 3, bids: 8, status: "trending" },
]

const usersData = [
  {
    id: 1,
    username: "sneaker_collector",
    email: "user1@example.com",
    spent: 12500,
    joinDate: "2024-01-10",
    status: "active",
  },
  {
    id: 2,
    username: "crypto_sneakerhead",
    email: "user2@example.com",
    spent: 8350,
    joinDate: "2024-01-15",
    status: "active",
  },
  { id: 3, username: "rare_kicks", email: "user3@example.com", spent: 22100, joinDate: "2023-12-20", status: "active" },
  {
    id: 4,
    username: "sole_trader",
    email: "user4@example.com",
    spent: 5200,
    joinDate: "2024-01-05",
    status: "suspended",
  },
  {
    id: 5,
    username: "limited_drops",
    email: "user5@example.com",
    spent: 15800,
    joinDate: "2023-11-28",
    status: "active",
  },
]

const transactionsData = [
  {
    id: 1,
    buyer: "sneaker_collector",
    seller: "crypto_sneakerhead",
    item: "Jordan 1",
    amount: 1250,
    crypto: "5.2 SOL",
    date: "2024-01-20",
    status: "completed",
  },
  {
    id: 2,
    buyer: "rare_kicks",
    seller: "sole_trader",
    item: "Yeezy 350",
    amount: 420,
    crypto: "1.75 SOL",
    date: "2024-01-19",
    status: "completed",
  },
  {
    id: 3,
    buyer: "crypto_sneakerhead",
    seller: "limited_drops",
    item: "NB 990v6",
    amount: 280,
    crypto: "1.17 SOL",
    date: "2024-01-18",
    status: "pending",
  },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "sneakers" | "users" | "transactions">("dashboard")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSneakers = sneakersData.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.brand.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredUsers = usersData.filter(
    (u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredTransactions = transactionsData.filter(
    (t) =>
      t.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.item.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Admin Header */}
      <div className="border-b border-border bg-primary/20 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Manage platform, users, and transactions</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Tabs */}
          <div className="mb-8 flex flex-wrap gap-2 border-b border-border">
            {[
              { id: "dashboard", label: "Dashboard", icon: BarChart3 },
              { id: "sneakers", label: "Sneakers", icon: ShoppingCart },
              { id: "users", label: "Users", icon: Users },
              { id: "transactions", label: "Transactions", icon: Wallet },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 border-b-2 px-4 py-3 font-medium transition ${
                  activeTab === tab.id
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {adminStats.map((stat, idx) => (
                  <div key={idx} className="rounded-lg bg-card p-6 border border-border">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <stat.icon className="h-8 w-8 text-accent/50" />
                    </div>
                    <p className={`mt-2 text-xs ${stat.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                      {stat.change} from last month
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="rounded-lg bg-card p-6 border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <Button className="justify-start bg-accent hover:bg-accent/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Sneaker
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    View Reports
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    Manage Promotions
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    System Settings
                  </Button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="rounded-lg bg-card p-6 border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">Recent Transactions</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="px-4 py-3 text-left text-muted-foreground font-medium">Buyer</th>
                        <th className="px-4 py-3 text-left text-muted-foreground font-medium">Item</th>
                        <th className="px-4 py-3 text-left text-muted-foreground font-medium">Amount</th>
                        <th className="px-4 py-3 text-left text-muted-foreground font-medium">Date</th>
                        <th className="px-4 py-3 text-left text-muted-foreground font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {transactionsData.slice(0, 3).map((tx) => (
                        <tr key={tx.id} className="hover:bg-primary/50 transition">
                          <td className="px-4 py-3 text-foreground font-medium">{tx.buyer}</td>
                          <td className="px-4 py-3 text-muted-foreground">{tx.item}</td>
                          <td className="px-4 py-3 text-accent font-semibold">${tx.amount}</td>
                          <td className="px-4 py-3 text-muted-foreground text-xs">{tx.date}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                tx.status === "completed"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Sneakers Tab */}
          {activeTab === "sneakers" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search sneakers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="bg-accent hover:bg-accent/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Sneaker
                </Button>
              </div>

              <div className="overflow-x-auto rounded-lg bg-card border border-border">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Name</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Brand</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Base Price</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Listings</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Bids</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Status</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredSneakers.map((sneaker) => (
                      <tr key={sneaker.id} className="hover:bg-primary/50 transition">
                        <td className="px-4 py-3 text-foreground font-medium">{sneaker.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{sneaker.brand}</td>
                        <td className="px-4 py-3 text-foreground font-semibold">${sneaker.price}</td>
                        <td className="px-4 py-3 text-foreground">{sneaker.listings}</td>
                        <td className="px-4 py-3 text-foreground">{sneaker.bids}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              sneaker.status === "trending"
                                ? "bg-accent/20 text-accent"
                                : "bg-green-500/20 text-green-400"
                            }`}
                          >
                            {sneaker.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button className="p-1.5 text-muted-foreground hover:text-accent transition">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1.5 text-muted-foreground hover:text-accent transition">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-1.5 text-muted-foreground hover:text-destructive transition">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="bg-accent hover:bg-accent/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </div>

              <div className="overflow-x-auto rounded-lg bg-card border border-border">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Username</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Email</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Total Spent</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Join Date</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Status</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-primary/50 transition">
                        <td className="px-4 py-3 text-foreground font-medium">{user.username}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{user.email}</td>
                        <td className="px-4 py-3 text-accent font-semibold">${user.spent}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{user.joinDate}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              user.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Button size="sm" variant="outline">
                            Manage
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === "transactions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="bg-accent hover:bg-accent/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Transaction
                </Button>
              </div>

              <div className="overflow-x-auto rounded-lg bg-card border border-border">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Buyer</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Seller</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Item</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Amount</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Crypto</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Date</th>
                      <th className="px-4 py-3 text-left text-muted-foreground font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-primary/50 transition">
                        <td className="px-4 py-3 text-foreground font-medium text-xs">{tx.buyer}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{tx.seller}</td>
                        <td className="px-4 py-3 text-foreground">{tx.item}</td>
                        <td className="px-4 py-3 text-foreground font-semibold">${tx.amount}</td>
                        <td className="px-4 py-3 text-accent font-mono text-xs">{tx.crypto}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{tx.date}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              tx.status === "completed"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
