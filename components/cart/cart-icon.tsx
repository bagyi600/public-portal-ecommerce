'use client'

import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import Link from 'next/link'

export function CartIcon() {
  const { getItemCount } = useCart()
  const itemCount = getItemCount()
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      onClick={() => window.location.href = '/cart'}
    >
      <ShoppingBag className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  )
}