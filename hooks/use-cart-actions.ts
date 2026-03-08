'use client'

import { useCart } from '@/lib/cart-context'

export interface AddToCartParams {
  productId: string
  name: string
  price: number
  image: string
  color?: string
  size?: string
  variantId?: string
  isVipExclusive?: boolean
}

export function useCartActions() {
  const { addToCart, removeFromCart, updateQuantity, getItemCount, getCartTotal } = useCart()
  
  const addItemToCart = (params: AddToCartParams, quantity: number = 1) => {
    addToCart({
      ...params,
      quantity
    })
    
    // Return success message or cart update
    return {
      success: true,
      message: `Added ${quantity} ${params.name} to cart`,
      cartCount: getItemCount(),
      cartTotal: getCartTotal()
    }
  }
  
  const removeItemFromCart = (itemId: string) => {
    removeFromCart(itemId)
    return {
      success: true,
      message: 'Item removed from cart',
      cartCount: getItemCount(),
      cartTotal: getCartTotal()
    }
  }
  
  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity)
    return {
      success: true,
      message: 'Quantity updated',
      cartCount: getItemCount(),
      cartTotal: getCartTotal()
    }
  }
  
  const getCartSummary = () => {
    const { state } = useCart()
    return {
      itemCount: state.totalItems,
      subtotal: state.subtotal,
      shipping: state.shipping,
      tax: state.tax,
      discount: state.discount,
      total: state.total,
      items: state.items
    }
  }
  
  return {
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    getCartSummary,
    getItemCount,
    getCartTotal
  }
}
