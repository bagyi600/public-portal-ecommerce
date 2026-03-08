// Mock API Client - Works without backend
// Simulates API responses for development

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation.',
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.5,
    reviewCount: 128,
    category: 'Electronics',
    tags: ['Wireless', 'Noise Cancelling'],
    stock: 25,
    isNew: true,
    isFeatured: true,
    image: '/api/placeholder/400/400'
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring.',
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.7,
    reviewCount: 89,
    category: 'Wearables',
    tags: ['Fitness', 'Smartwatch'],
    stock: 15,
    isNew: true,
    isFeatured: false,
    image: '/api/placeholder/400/400'
  },
  {
    id: '3',
    name: 'Professional Camera Lens',
    description: 'High-performance camera lens for professional photography.',
    price: 899.99,
    originalPrice: 1099.99,
    rating: 4.9,
    reviewCount: 42,
    category: 'Photography',
    tags: ['Camera', 'Lens'],
    stock: 8,
    isNew: false,
    isFeatured: true,
    image: '/api/placeholder/400/400'
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable office chair with lumbar support.',
    price: 399.99,
    originalPrice: 499.99,
    rating: 4.3,
    reviewCount: 56,
    category: 'Furniture',
    tags: ['Office', 'Ergonomic'],
    stock: 12,
    isNew: false,
    isFeatured: false,
    image: '/api/placeholder/400/400'
  },
  {
    id: '5',
    name: 'Gaming Laptop',
    description: 'High-performance gaming laptop with RTX graphics.',
    price: 1499.99,
    originalPrice: 1799.99,
    rating: 4.8,
    reviewCount: 203,
    category: 'Computers',
    tags: ['Gaming', 'Laptop'],
    stock: 6,
    isNew: true,
    isFeatured: true,
    image: '/api/placeholder/400/400'
  },
  {
    id: '6',
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with charging case.',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.4,
    reviewCount: 187,
    category: 'Electronics',
    tags: ['Wireless', 'Earbuds'],
    stock: 34,
    isNew: false,
    isFeatured: false,
    image: '/api/placeholder/400/400'
  }
];

// Mock user data
const mockUser = {
  id: 'usr_123',
  email: 'demo@sheinvip.com',
  firstName: 'Demo',
  lastName: 'User',
  tier: 'gold',
  commissionRate: 15,
  totalEarnings: 1250.50,
  referrals: 24,
  joinDate: '2024-01-15'
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API client
export const apiClient = {
  get: async (url: string, config?: any) => {
    await delay(500); // Simulate network delay
    
    if (url === '/products/search') {
      return {
        data: {
          products: mockProducts,
          total: mockProducts.length,
          page: 1,
          limit: 10
        }
      };
    }
    
    if (url.startsWith('/products/')) {
      const id = url.split('/')[2];
      const product = mockProducts.find(p => p.id === id);
      return { data: product };
    }
    
    if (url === '/users/me') {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw { response: { status: 401 } };
      }
      return { data: mockUser };
    }
    
    if (url === '/vip/me') {
      return {
        data: {
          tier: mockUser.tier,
          commissionRate: mockUser.commissionRate,
          totalEarnings: mockUser.totalEarnings,
          referrals: mockUser.referrals,
          nextTier: 'platinum',
          progress: 65
        }
      };
    }
    
    if (url === '/vip/tiers') {
      return {
        data: [
          { name: 'Bronze', commission: 5, price: 0, color: 'bg-amber-700' },
          { name: 'Silver', commission: 10, price: 9.99, color: 'bg-gray-400' },
          { name: 'Gold', commission: 15, price: 19.99, color: 'bg-yellow-500' },
          { name: 'Platinum', commission: 20, price: 49.99, color: 'bg-purple-600' }
        ]
      };
    }
    
    return { data: {} };
  },
  
  post: async (url: string, data?: any, config?: any) => {
    await delay(500);
    
    if (url === '/auth/login') {
      if (data.email === 'demo@sheinvip.com' && data.password === 'Demo123!') {
        return {
          data: {
            accessToken: 'mock_access_token_123',
            refreshToken: 'mock_refresh_token_123',
            user: mockUser
          }
        };
      }
      throw { response: { status: 401, data: { message: 'Invalid credentials' } } };
    }
    
    if (url === '/auth/register') {
      return {
        data: {
          accessToken: 'mock_access_token_new',
          refreshToken: 'mock_refresh_token_new',
          user: { ...mockUser, id: 'usr_new', email: data.email, firstName: data.firstName }
        }
      };
    }
    
    if (url === '/orders') {
      return {
        data: {
          orderId: 'ord_' + Date.now(),
          status: 'processing',
          total: data.total,
          items: data.items
        }
      };
    }
    
    return { data: {} };
  },
  
  patch: async (url: string, data?: any, config?: any) => {
    await delay(300);
    return { data: { ...mockUser, ...data } };
  }
};

// API endpoints (compatible with existing code)
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post('/auth/login', credentials),
  
  register: (data: any) => apiClient.post('/auth/register', data),
  
  refreshToken: (refreshToken: string) =>
    Promise.resolve({ data: { accessToken: 'new_mock_token', refreshToken: 'new_refresh_token' } }),
  
  logout: () => Promise.resolve({ data: {} }),
};

export const userApi = {
  getProfile: () => apiClient.get('/users/me'),
  
  updateProfile: (data: any) => apiClient.patch('/users/me', data),
  
  getInvitationCodes: () => 
    Promise.resolve({ 
      data: [
        { code: 'VIP2024', uses: 3, maxUses: 10, expiresAt: '2024-12-31' },
        { code: 'WELCOME50', uses: 0, maxUses: 50, expiresAt: '2024-06-30' }
      ] 
    }),
  
  generateInvitationCode: (data: { maxUses: number; expiresInDays: number }) =>
    Promise.resolve({ data: { code: 'NEW' + Math.random().toString(36).substr(2, 8).toUpperCase(), ...data } }),
};

export const vipApi = {
  getTiers: () => apiClient.get('/vip/tiers'),
  
  getUserStatus: () => apiClient.get('/vip/me'),
};

export const productApi = {
  search: (params: any) => apiClient.get('/products/search', { params }),
  
  getProduct: (id: string) => apiClient.get(`/products/${id}`),
};

export const orderApi = {
  getCart: () => 
    Promise.resolve({ 
      data: { 
        items: [], 
        subtotal: 0, 
        shipping: 0, 
        tax: 0, 
        total: 0 
      } 
    }),
  
  addToCart: (data: any) => Promise.resolve({ data: { success: true, item: data } }),
  
  createOrder: (data: any) => apiClient.post('/orders', data),
  
  getOrders: (params: any) => 
    Promise.resolve({ 
      data: { 
        orders: [
          { id: 'ord_001', date: '2024-01-20', total: 199.99, status: 'delivered' },
          { id: 'ord_002', date: '2024-02-15', total: 299.99, status: 'processing' }
        ], 
        total: 2 
      } 
    }),
};