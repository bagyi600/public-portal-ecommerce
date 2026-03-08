'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, CreditCard, DollarSign, Package, Shield } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function CheckoutPage() {
  const router = useRouter();
  const { state, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
    paymentMethod: 'credit_card'
  });

  const subtotal = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.05;
  const total = subtotal + shippingFee + tax;

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    clearCart();
    router.push('/checkout/success');
    setIsProcessing(false);
  };

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-gray-600 mb-6">Add some products to your cart before checking out.</p>
        <Link href="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === num ? 'bg-purple-600 text-white' :
                  step > num ? 'bg-green-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {step > num ? <CheckCircle className="h-5 w-5" /> : num}
                </div>
                <span className="ml-2 text-sm font-medium">
                  {num === 1 ? 'Shipping' : num === 2 ? 'Payment' : 'Review'}
                </span>
                {num < 3 && (
                  <div className={`w-16 h-1 mx-2 ${step > num ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {step === 1 && 'Shipping Information'}
                  {step === 2 && 'Payment Method'}
                  {step === 3 && 'Order Review'}
                </CardTitle>
                <CardDescription>
                  {step === 1 && 'Enter your shipping details'}
                  {step === 2 && 'Select your preferred payment method'}
                  {step === 3 && 'Review your order before placing it'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name *</label>
                      <Input
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Address *</label>
                      <Input
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        placeholder="Street address"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City *</label>
                        <Input
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          placeholder="Yangon"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone *</label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="09XXXXXXXXX"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        className={`p-4 border rounded-lg text-center ${
                          formData.paymentMethod === 'credit_card' 
                            ? 'border-purple-600 bg-purple-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setFormData({...formData, paymentMethod: 'credit_card'})}
                      >
                        <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                        <div className="font-medium">Credit Card</div>
                      </button>
                      
                      <button
                        className={`p-4 border rounded-lg text-center ${
                          formData.paymentMethod === 'paypal' 
                            ? 'border-purple-600 bg-purple-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onClick={() => setFormData({...formData, paymentMethod: 'paypal'})}
                      >
                        <DollarSign className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                        <div className="font-medium">PayPal</div>
                      </button>
                    </div>
                    
                    {formData.paymentMethod === 'credit_card' && (
                      <div className="space-y-4">
                        <Input placeholder="Card Number" />
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input placeholder="Expiry Date (MM/YY)" />
                          <Input placeholder="CVV" />
                        </div>
                        <Input placeholder="Name on Card" />
                      </div>
                    )}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-800">Secure Checkout</h4>
                          <p className="text-sm text-green-700 mt-1">
                            Your payment information is encrypted and secure.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Shipping Information</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="font-medium">{formData.fullName}</p>
                        <p className="text-gray-600">{formData.address}</p>
                        <p className="text-gray-600">{formData.city}</p>
                        <p className="text-gray-600">Phone: {formData.phone}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {state.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  {step > 1 ? (
                    <Button variant="outline" onClick={handlePrevStep}>
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {step < 3 ? (
                    <Button onClick={handleNextStep}>
                      Continue
                    </Button>
                  ) : (
                    <Button onClick={handlePlaceOrder} disabled={isProcessing}>
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-gray-600">
                          {item.name} × {item.quantity}
                        </span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>${shippingFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
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