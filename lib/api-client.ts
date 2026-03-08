import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Token expired, clear storage and redirect to login
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth/login', credentials),
  
  register: (data: {
    invitationCode: string
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string
    acceptTerms: boolean
    marketingConsent?: boolean
  }) => apiClient.post('/auth/register', data),
  
  refreshToken: (refreshToken: string) =>
    apiClient.post('/auth/refresh', { refreshToken }),
  
  logout: () => apiClient.post('/auth/logout'),
}

export const userApi = {
  getProfile: () => apiClient.get('/users/me'),
  
  updateProfile: (data: any) => apiClient.patch('/users/me', data),
  
  getInvitationCodes: () => apiClient.get('/users/me/invitation-codes'),
  
  generateInvitationCode: (data: { maxUses: number; expiresInDays: number }) =>
    apiClient.post('/users/me/invitation-codes', data),
}

export const vipApi = {
  getTiers: () => apiClient.get('/vip/tiers'),
  
  getUserStatus: () => apiClient.get('/vip/me'),
}

export const productApi = {
  search: (params: {
    q?: string
    category?: string
    page?: number
    limit?: number
    sort?: string
  }) => apiClient.get('/products/search', { params }),
  
  getProduct: (id: string) => apiClient.get(`/products/${id}`),
}

export const orderApi = {
  getCart: () => apiClient.get('/orders/cart'),
  
  addToCart: (data: { productId: string; variantId?: string; quantity: number }) =>
    apiClient.post('/orders/cart/items', data),
  
  createOrder: (data: any) => apiClient.post('/orders', data),
  
  getOrders: (params: { page?: number; limit?: number }) =>
    apiClient.get('/orders', { params }),
}
