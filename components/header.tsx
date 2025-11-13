"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-accent">
              PriShoes
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/browse" className="text-sm text-muted-foreground hover:text-foreground transition">
                Browse
              </Link>
              <Link href="/trending" className="text-sm text-muted-foreground hover:text-foreground transition">
                Trending
              </Link>
              <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
                How It Works
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90">
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
