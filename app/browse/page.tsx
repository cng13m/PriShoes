"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import Link from "next/link"

const allSneakers = [
  {
    id: 1,
    name: "Air Jordan 1 Retro",
    brand: "Nike",
    price: 1250,
    solanPrice: 5.2,
    image: "/placeholder.svg?key=aj1",
    category: "Basketball",
  },
  {
    id: 2,
    name: "Yeezy 350 V2",
    brand: "Adidas",
    price: 420,
    solanPrice: 1.75,
    image: "/placeholder.svg?key=yeezy",
    category: "Lifestyle",
  },
  {
    id: 3,
    name: "New Balance 990v6",
    brand: "New Balance",
    price: 280,
    solanPrice: 1.17,
    image: "/placeholder.svg?key=nb990",
    category: "Lifestyle",
  },
  {
    id: 4,
    name: "Dunk Low Pro",
    brand: "Nike",
    price: 180,
    solanPrice: 0.75,
    image: "/placeholder.svg?key=dunk",
    category: "Basketball",
  },
  {
    id: 5,
    name: "Sacai Waffle",
    brand: "Nike",
    price: 320,
    solanPrice: 1.33,
    image: "/placeholder.svg?key=sacai",
    category: "Lifestyle",
  },
  {
    id: 6,
    name: "Travis Scott Jordan 1",
    brand: "Jordan",
    price: 2800,
    solanPrice: 11.67,
    image: "/placeholder.svg?key=ts1",
    category: "Collab",
  },
  {
    id: 7,
    name: "Off-White AJ1",
    brand: "Jordan",
    price: 1800,
    solanPrice: 7.5,
    image: "/placeholder.svg?key=ow",
    category: "Collab",
  },
  {
    id: 8,
    name: "Air Max 90",
    brand: "Nike",
    price: 150,
    solanPrice: 0.63,
    image: "/placeholder.svg?key=am90",
    category: "Lifestyle",
  },
  {
    id: 9,
    name: "Balenciaga Triple S",
    brand: "Balenciaga",
    price: 950,
    solanPrice: 3.96,
    image: "/placeholder.svg?key=triplets",
    category: "Lifestyle",
  },
  {
    id: 10,
    name: "New Balance 2002R",
    brand: "New Balance",
    price: 225,
    solanPrice: 0.94,
    image: "/placeholder.svg?key=2002r",
    category: "Lifestyle",
  },
  {
    id: 11,
    name: "Air Jordan 11",
    brand: "Jordan",
    price: 380,
    solanPrice: 1.58,
    image: "/placeholder.svg?key=aj11",
    category: "Basketball",
  },
  {
    id: 12,
    name: "Puma RS-X",
    brand: "Puma",
    price: 130,
    solanPrice: 0.54,
    image: "/placeholder.svg?key=rsx",
    category: "Lifestyle",
  },
]

const brands = ["Nike", "Adidas", "Jordan", "New Balance", "Puma", "Balenciaga"]
const categories = ["Basketball", "Lifestyle", "Running", "Collab"]
const priceRanges = [
  { label: "Under $200", min: 0, max: 200 },
  { label: "$200 - $500", min: 200, max: 500 },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "Over $1000", min: 1000, max: Number.POSITIVE_INFINITY },
]

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null)
  const [sortBy, setSortBy] = useState("newest")

  const filtered = allSneakers.filter((sneaker) => {
    const matchesSearch =
      sneaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sneaker.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = !selectedBrand || sneaker.brand === selectedBrand
    const matchesCategory = !selectedCategory || sneaker.category === selectedCategory
    const matchesPrice =
      !selectedPriceRange || (sneaker.price >= selectedPriceRange.min && sneaker.price <= selectedPriceRange.max)

    return matchesSearch && matchesBrand && matchesCategory && matchesPrice
  })

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <div className="border-b border-border bg-primary/20 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground">Browse Sneakers</h1>
          <p className="mt-2 text-muted-foreground">Discover rare and trending sneakers from top brands</p>
        </div>
      </div>

      <div className="flex gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Sidebar Filters */}
        <div className="hidden w-64 flex-shrink-0 lg:block">
          <div className="rounded-lg bg-card p-6">
            {/* Search */}
            <div className="mb-6">
              <h3 className="mb-3 font-semibold text-foreground">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search sneakers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6 border-t border-border pt-6">
              <h3 className="mb-3 font-semibold text-foreground">Brand</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <button
                    key={brand}
                    onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                    className={`block w-full rounded px-3 py-2 text-left text-sm transition ${
                      selectedBrand === brand
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-primary hover:text-foreground"
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6 border-t border-border pt-6">
              <h3 className="mb-3 font-semibold text-foreground">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    className={`block w-full rounded px-3 py-2 text-left text-sm transition ${
                      selectedCategory === category
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-primary hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="border-t border-border pt-6">
              <h3 className="mb-3 font-semibold text-foreground">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() =>
                      setSelectedPriceRange(
                        selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max ? null : range,
                      )
                    }
                    className={`block w-full rounded px-3 py-2 text-left text-sm transition ${
                      selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-primary hover:text-foreground"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Sort Controls */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{sorted.length} results</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded bg-card px-3 py-2 text-sm text-foreground border border-border"
              >
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Sneakers Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sorted.map((sneaker) => (
              <Link key={sneaker.id} href={`/sneakers/${sneaker.id}`}>
                <div className="group cursor-pointer overflow-hidden rounded-xl bg-card transition-all hover:shadow-lg hover:border-accent border border-border">
                  <div className="relative aspect-square overflow-hidden bg-primary">
                    <img
                      src={sneaker.image || "/placeholder.svg"}
                      alt={sneaker.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">{sneaker.brand}</p>
                    <h3 className="mt-1 line-clamp-2 font-semibold text-foreground">{sneaker.name}</h3>
                    <div className="mt-4 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Price</span>
                        <span className="font-semibold text-foreground">${sneaker.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">SOL</span>
                        <span className="font-semibold text-accent">{sneaker.solanPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card py-12">
              <p className="text-lg font-semibold text-foreground">No sneakers found</p>
              <p className="mt-2 text-muted-foreground">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
