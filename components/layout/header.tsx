import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, User, Crown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { CartIcon } from '@/components/cart/cart-icon'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg" />
              <span className="text-xl font-bold text-gray-900">
                SHEIN<span className="text-purple-600">-VIP</span>
              </span>
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/vip"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-1"
            >
              <Crown className="h-4 w-4" />
              VIP
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              Contact
            </Link>
          </nav>
          
          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            
            <CartIcon />
            
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button asChild className="hidden sm:inline-flex">
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
