'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  color?: string
  size?: string
  variantId?: string
  isVipExclusive?: boolean
}

interface CartState {
  items: CartItem[]
  totalItems: number
  subtotal: number
  shipping: number
  tax: number
  total: number
  discount?: {
    code: string
    amount: number
    type: 'percentage' | 'fixed'
  }
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_DISCOUNT'; payload: { code: string; amount: number; type: 'percentage' | 'fixed' } }
  | { type: 'REMOVE_DISCOUNT' }
  | { type: 'LOAD_CART'; payload: CartState }

interface CartContextType {
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addToCart: (item: Omit<CartItem, 'id'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  applyDiscount: (code: string, amount: number, type: 'percentage' | 'fixed') => void
  removeDiscount: () => void
  getItemCount: () => number
  getCartTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const calculateCartTotals = (items: CartItem[], discount?: CartState['discount']): Omit<CartState, 'items' | 'discount'> => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  
  // Calculate shipping (free over $50)
  const shipping = subtotal >= 50 ? 0 : 5.99
  
  // Calculate tax (8% for demo)
  const tax = subtotal * 0.08
  
  // Apply discount if any
  let discountAmount = 0
  if (discount) {
    if (discount.type === 'percentage') {
      discountAmount = subtotal * (discount.amount / 100)
    } else {
      discountAmount = discount.amount
    }
  }
  
  const total = Math.max(0, subtotal + shipping + tax - discountAmount)
  
  return {
    totalItems,
    subtotal: parseFloat(subtotal.toFixed(2)),
    shipping: parseFloat(shipping.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(total.toFixed(2))
  }
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => 
        item.productId === action.payload.productId && 
        item.color === action.payload.color && 
        item.size === action.payload.size
      )
      
      let newItems: CartItem[]
      if (existingItemIndex >= 0) {
        newItems = [...state.items]
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + action.payload.quantity
        }
      } else {
        newItems = [...state.items, { ...action.payload, id: Date.now().toString() }]
      }
      
      const totals = calculateCartTotals(newItems, state.discount)
      return {
        ...state,
        items: newItems,
        ...totals
      }
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload)
      const totals = calculateCartTotals(newItems, state.discount)
      return {
        ...state,
        items: newItems,
        ...totals
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      )
      const totals = calculateCartTotals(newItems, state.discount)
      return {
        ...state,
        items: newItems,
        ...totals
      }
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        totalItems: 0,
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0
      }
    
    case 'APPLY_DISCOUNT': {
      const totals = calculateCartTotals(state.items, action.payload)
      return {
        ...state,
        discount: action.payload,
        ...totals
      }
    }
    
    case 'REMOVE_DISCOUNT': {
      const totals = calculateCartTotals(state.items)
      return {
        ...state,
        discount: undefined,
        ...totals
      }
    }
    
    case 'LOAD_CART':
      return action.payload
    
    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sheinvip_cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsedCart })
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error)
      }
    }
  }, [])
  
  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('sheinvip_cart', JSON.stringify(state))
  }, [state])
  
  const addToCart = (item: Omit<CartItem, 'id'>) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...item, id: Date.now().toString() }
    })
  }
  
  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }
  
  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }
  
  const applyDiscount = (code: string, amount: number, type: 'percentage' | 'fixed') => {
    dispatch({ type: 'APPLY_DISCOUNT', payload: { code, amount, type } })
  }
  
  const removeDiscount = () => {
    dispatch({ type: 'REMOVE_DISCOUNT' })
  }
  
  const getItemCount = () => state.totalItems
  
  const getCartTotal = () => state.total
  
  const contextValue: CartContextType = {
    state,
    dispatch,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyDiscount,
    removeDiscount,
    getItemCount,
    getCartTotal
  }
  
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
