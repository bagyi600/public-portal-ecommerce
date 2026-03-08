import Link from 'next/link';
import { ArrowRight, Shield, Truck, CreditCard, Star, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Secure Shopping',
    description: 'Your security is our priority. All transactions are encrypted.'
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: 'Fast Delivery',
    description: 'Free shipping on orders over $100. Delivery within 3-5 days.'
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: 'Easy Payments',
    description: 'Multiple payment options including credit cards and PayPal.'
  },
  {
    icon: <Crown className="h-8 w-8" />,
    title: 'VIP Program',
    description: 'Join our VIP program and earn commissions on referrals.'
  }
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
            <Crown className="h-5 w-5" />
            <span className="font-bold">VIP PROGRAM NOW AVAILABLE</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-yellow-300">Public Portal</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover amazing products, join our VIP program, and start earning commissions today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/vip">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Crown className="mr-2 h-5 w-5" />
                Join VIP
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best shopping experience with premium products and exclusive benefits.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="h-16 w-16 mx-auto mb-4 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover our most popular products at amazing prices
          </p>
          <Link href="/products">
            <Button>
              Browse All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* VIP Program CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <Crown className="h-12 w-12 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Become a VIP Member</h2>
              <p className="text-xl mb-8">
                Join our exclusive VIP program and start earning commissions on every referral.
                The more friends you invite, the higher your earnings!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/vip">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                    Learn More
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Sign Up Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who love shopping with us.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, starIndex) => (
                      <Star key={starIndex} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6">
                    &quot;Amazing products and even better customer service! The VIP program has helped me earn extra income while shopping for things I love.&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="font-semibold">Sarah Johnson</p>
                      <p className="text-sm text-gray-600">VIP Gold Member</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}