'use client';

import { Crown, Star, Users, Gift, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const tiers = [
  {
    name: 'Bronze',
    price: 'Free',
    commission: '5%',
    color: 'bg-amber-700',
    features: [
      'Basic commission rate',
      'Access to referral program',
      'Standard support',
      'Monthly earnings report'
    ]
  },
  {
    name: 'Silver',
    price: '$9.99/month',
    commission: '10%',
    color: 'bg-gray-400',
    features: [
      'Higher commission rate',
      'Priority support',
      'Advanced analytics',
      'Weekly earnings report',
      'Early access to new features'
    ]
  },
  {
    name: 'Gold',
    price: '$19.99/month',
    commission: '15%',
    color: 'bg-yellow-500',
    features: [
      'Premium commission rate',
      '24/7 priority support',
      'Real-time analytics',
      'Daily earnings report',
      'Exclusive product access',
      'VIP webinars'
    ],
    popular: true
  },
  {
    name: 'Platinum',
    price: '$49.99/month',
    commission: '20%',
    color: 'bg-purple-600',
    features: [
      'Maximum commission rate',
      'Dedicated account manager',
      'Custom analytics dashboard',
      'Real-time notifications',
      'Exclusive VIP events',
      'Personalized training',
      'Highest priority support'
    ]
  }
];

const benefits = [
  {
    icon: <Crown className="h-8 w-8" />,
    title: 'Exclusive Access',
    description: 'Get early access to new products and features before anyone else.'
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: 'Higher Commissions',
    description: 'Earn more with each sale as you climb the VIP tiers.'
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Community',
    description: 'Join an exclusive community of top performers and network with peers.'
  },
  {
    icon: <Gift className="h-8 w-8" />,
    title: 'Special Rewards',
    description: 'Receive exclusive gifts, bonuses, and rewards throughout the year.'
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Priority Support',
    description: 'Get faster responses and dedicated support for all your needs.'
  }
];

export default function VIPPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full mb-6">
            <Crown className="h-6 w-6" />
            <span className="font-bold">VIP PROGRAM</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Unlock Exclusive Benefits</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our VIP program and earn higher commissions, get exclusive access, and enjoy premium benefits.
            The more you invite, the higher your tier!
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="h-12 w-12 mx-auto mb-4 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tiers Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Choose Your Tier</h2>
            <p className="text-gray-600">Upgrade your tier to unlock more benefits and higher commissions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <Card key={tier.name} className={`relative ${
                tier.popular ? 'border-2 border-purple-600 shadow-lg' : ''
              }`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`h-12 w-12 ${tier.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                      {tier.name.charAt(0)}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{tier.commission}</div>
                      <div className="text-sm text-gray-600">commission</div>
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription className="text-lg font-semibold">
                    {tier.price}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    className={`w-full ${
                      tier.popular 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : 'bg-gray-800 hover:bg-gray-900'
                    }`}
                  >
                    {tier.name === 'Bronze' ? 'Get Started' : 'Upgrade Now'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">How It Works</CardTitle>
            <CardDescription>
              Start earning more with our simple 3-step process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <h3 className="font-semibold text-lg mb-2">Sign Up & Start</h3>
                <p className="text-gray-600">
                  Join the VIP program and start at Bronze tier. Begin inviting friends immediately.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <h3 className="font-semibold text-lg mb-2">Invite & Earn</h3>
                <p className="text-gray-600">
                  Share your referral link. Earn commission on every purchase your friends make.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 mx-auto mb-4 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <h3 className="font-semibold text-lg mb-2">Level Up</h3>
                <p className="text-gray-600">
                  As you invite more friends, automatically upgrade to higher tiers with better benefits.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
          <Crown className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Become a VIP?</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Start earning higher commissions today. Join thousands of successful members in our VIP program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
              Join VIP Program
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}