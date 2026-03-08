# Public Portal E-commerce Platform

A modern e-commerce platform with VIP membership system, built with Next.js 14, TypeScript, and TailwindCSS.

## 🚀 Features

### ✅ **Core E-commerce Features**
- **Product Catalog** - Browse, search, and filter products
- **Shopping Cart** - Add, remove, and manage items with real-time calculations
- **Checkout System** - Complete order processing flow
- **User Authentication** - Login/Register with validation

### 🏆 **VIP Membership System**
- **4-Tier System** - Bronze, Silver, Gold, Platinum
- **Commission Earnings** - 5% to 20% based on tier
- **Referral Program** - Invite friends and earn commissions
- **Dashboard** - Track earnings, referrals, and progress

### 🎨 **Modern UI/UX**
- Responsive design with TailwindCSS
- Professional component library
- Lucide React icons
- Gradient-based color scheme

## 🏗️ Architecture

### **Tech Stack**
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **State Management:** React Context + useReducer
- **Icons:** Lucide React
- **Storage:** LocalStorage (cart, auth)

### **Project Structure**
```
public-portal/
├── app/                    # Next.js App Router pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── dashboard/         # User dashboard + invite system
│   ├── login/             # Authentication
│   ├── products/          # Product catalog
│   ├── register/          # User registration
│   ├── vip/               # VIP membership system
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── cart/              # Cart-specific components
│   ├── ui/                # UI primitives (Button, Card, etc.)
│   ├── footer.tsx         # Site footer
│   ├── header.tsx         # Site header
│   └── product-card.tsx   # Product display component
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities & contexts
│   ├── api-client.ts      # Mock API client
│   ├── cart-context.tsx   # Cart state management
│   └── utils.ts           # Utility functions
└── public/               # Static assets
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone https://github.com/bagyi600/public-portal-ecommerce.git
cd public-portal-ecommerce

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Development Server**
The application will be available at:
- **Local:** http://localhost:3000
- **Network:** http://[YOUR_IP]:3000

### **Demo Credentials**
- **Email:** demo@sheinvip.com
- **Password:** Demo123!

## 📦 Key Components

### **Cart System**
- Complete state management with useReducer
- LocalStorage persistence
- Automatic calculations (tax, shipping, discounts)
- Discount code support

### **VIP Tiers**
1. **Bronze** - 5% commission (Free)
2. **Silver** - 10% commission ($9.99/month)
3. **Gold** - 15% commission ($19.99/month) ⭐ Most Popular
4. **Platinum** - 20% commission ($49.99/month)

### **Mock API**
- Simulates backend responses
- No external dependencies needed
- Configurable delay for realistic experience
- Compatible with real API integration

## 🔧 Development

### **Available Scripts**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
```

### **Environment Variables**
Create `.env.local` for production:
```env
NEXT_PUBLIC_API_URL=http://your-api-url.com/api/v1
```

### **Type Checking**
```bash
npx tsc --noEmit  # Check for TypeScript errors
```

## 🎯 Future Enhancements

### **Phase 2: Backend Integration**
- Real API endpoints with Express/NestJS
- PostgreSQL database with Prisma
- JWT authentication
- Payment gateway integration

### **Phase 3: Admin Panel**
- Product management (CRUD)
- Order processing
- User management
- Analytics dashboard

### **Phase 4: Advanced Features**
- Real-time notifications
- Email marketing integration
- Advanced analytics
- Mobile app (React Native)

## 📄 License

This project is proprietary software.

## 👥 Contact

For questions or support, please contact the development team.

---

**Built with ❤️ using Next.js, TypeScript, and TailwindCSS**