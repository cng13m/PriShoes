"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { WALLET_TYPES } from "@/lib/crypto-utils"
import { Wallet } from "lucide-react"

interface WalletConnectProps {
  onConnect?: (wallet: string, address: string) => void
}

export function WalletConnect({ onConnect }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const handleConnect = async (walletType: string) => {
    setIsConnecting(true)
    try {
      // In production, this would use actual wallet connection logic
      // For Phantom: window.solana?.connect()
      // For MetaMask: window.ethereum?.request({ method: 'eth_requestAccounts' })

      // Mock wallet connection
      const mockAddress = `${walletType.slice(0, 4)}...${Math.random().toString(36).slice(2, 8).toUpperCase()}`

      setWalletAddress(mockAddress)
      setConnected(true)
      onConnect?.(walletType, mockAddress)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  if (connected) {
    return (
      <div className="rounded-lg bg-accent/10 p-4 border border-accent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-accent" />
            <div>
              <p className="text-sm font-medium text-foreground">Wallet Connected</p>
              <p className="text-xs text-muted-foreground">{walletAddress}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setConnected(false)
              setWalletAddress("")
            }}
          >
            Disconnect
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-foreground">Choose a wallet to connect:</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          onClick={() => handleConnect(WALLET_TYPES.PHANTOM)}
          disabled={isConnecting}
          variant="outline"
          className="w-full"
        >
          {isConnecting ? "Connecting..." : "Phantom"}
        </Button>
        <Button
          onClick={() => handleConnect(WALLET_TYPES.METMASK)}
          disabled={isConnecting}
          variant="outline"
          className="w-full"
        >
          {isConnecting ? "Connecting..." : "MetaMask"}
        </Button>
        <Button
          onClick={() => handleConnect(WALLET_TYPES.WALLETCONNECT)}
          disabled={isConnecting}
          variant="outline"
          className="w-full"
        >
          {isConnecting ? "Connecting..." : "WalletConnect"}
        </Button>
        <Button
          onClick={() => handleConnect(WALLET_TYPES.COINBASE)}
          disabled={isConnecting}
          variant="outline"
          className="w-full"
        >
          {isConnecting ? "Connecting..." : "Coinbase Wallet"}
        </Button>
      </div>
    </div>
  )
}
