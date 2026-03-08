'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Users, DollarSign, TrendingUp, Package, Settings, Bell, CreditCard, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const stats = [
  {
    title: 'Total Orders',
    value: '1,248',
    change: '+12.5%',
    icon: <ShoppingBag className="h-5 w-5" />,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Total Revenue',
    value: '$24,580',
    change: '+8.2%',
    icon: <DollarSign className="h-5 w-5" />,
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Active Users',
    value: '3,842',
    change: '+5.7%',
    icon: <Users className="h-5 w-5" />,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Conversion Rate',
    value: '4.8%',
    change: '+1.2%',
    icon: <TrendingUp className="h-5 w-5" />,
    color: 'bg-orange-100 text-orange-600'
  }
];

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', date: '2024-03-08', amount: '$149.99', status: 'Delivered' },
  { id: '#ORD-002', customer: 'Jane Smith', date: '2024-03-07', amount: '$299.99', status: 'Processing' },
  { id: '#ORD-003', customer: 'Robert Johnson', date: '2024-03-07', amount: '$89.99', status: 'Delivered' },
  { id: '#ORD-004', customer: 'Emily Davis', date: '2024-03-06', amount: '$499.99', status: 'Shipped' },
  { id: '#ORD-005', customer: 'Michael Wilson', date: '2024-03-06', amount: '$199.99', status: 'Pending' }
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 248, revenue: '$49,504' },
  { name: 'Smart Watch', sales: 189, revenue: '$56,700' },
  { name: 'Laptop Stand', sales: 156, revenue: '$15,600' },
  { name: 'USB-C Hub', sales: 142, revenue: '$14,200' },
  { name: 'Wireless Mouse', sales: 128, revenue: '$12,800' }
];

export default function DashboardPage() {
  const [notifications, setNotifications] = useState(3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your store today.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/dashboard/settings'}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-600">from last month</span>
                    </div>
                  </div>
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${stat.color}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Recent Orders */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest orders from your store</CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => window.location.href = '/dashboard/orders'}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Order ID</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <Link href={`/dashboard/orders/${order.id}`} className="text-blue-600 hover:underline">
                              {order.id}
                            </Link>
                          </td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4 font-medium">{order.amount}</td>
                          <td className="py-3 px-4">
                            <Badge className={
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                              'bg-yellow-100 text-yellow-800'
                            }>
                              {order.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best selling products this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.sales} sales</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{product.revenue}</p>
                        <p className="text-sm text-gray-600">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div>
            {/* Quick Actions */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start" onClick={() => window.location.href = '/products'}>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Shop Now
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/dashboard/invite'}>
                    <Users className="mr-2 h-4 w-4" />
                    Invite Friends
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/vip'}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    VIP Program
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => window.location.href = '/dashboard/profile'}>
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your account</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      ✓
                    </div>
                    <div>
                      <p className="font-medium">Order #ORD-001 shipped</p>
                      <p className="text-sm text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      $
                    </div>
                    <div>
                      <p className="font-medium">New commission earned</p>
                      <p className="text-sm text-gray-600">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Friend joined via referral</p>
                      <p className="text-sm text-gray-600">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">VIP tier upgraded</p>
                      <p className="text-sm text-gray-600">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}