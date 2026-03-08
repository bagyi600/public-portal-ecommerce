'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { ShoppingCart, Star, Truck, Shield, RefreshCw, Heart, Share2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock product data
const mockProduct = {
  id: '1',
  name: 'Premium Wireless Headphones',
  description: 'Experience premium sound quality with our latest wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design.',
  longDescription: 'These premium wireless headphones deliver exceptional audio quality with advanced noise cancellation technology. Perfect for music lovers, gamers, and professionals who need immersive sound and crystal-clear communication.',
  price: 199.99,
  originalPrice: 249.99,
  rating: 4.5,
  reviewCount: 128,
  category: 'Electronics',
  tags: ['Wireless', 'Noise Cancelling', 'Bluetooth', 'Over-Ear'],
  stock: 25,
  isNew: true,
  isFeatured: true,
  specifications: {
    'Battery Life': '30 hours',
    'Charging Time': '2 hours',
    'Connectivity': 'Bluetooth 5.2',
    'Weight': '265g',
    'Noise Cancellation': 'Active',
    'Warranty': '2 years'
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  const product = mockProduct; // In real app, fetch by id from params.id

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: ''
    });
  };

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <a href="/" className="hover:text-purple-600">Home</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-purple-600">Products</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-xl mb-4 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-gray-700 mb-4">
                  {product.name.charAt(0)}
                </div>
                <p className="text-gray-600">Product Image</p>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4">
              {[1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center ${
                    selectedImage === index ? 'ring-2 ring-purple-600' : ''
                  }`}
                >
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-700">
                      {product.name.charAt(0)}
                    </div>
                    <p className="text-xs text-gray-600">Img {index}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Product Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                {product.isNew && (
                  <Badge className="bg-green-100 text-green-800">New</Badge>
                )}
                {product.isFeatured && (
                  <Badge className="bg-purple-100 text-purple-800">Featured</Badge>
                )}
                <span className="text-sm text-gray-600">In Stock: {product.stock}</span>
              </div>
              
              <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-gray-600">•</span>
                <span className="text-gray-600">{product.category}</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <Badge className="bg-red-100 text-red-800">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-green-600 text-sm mt-2">
                Free shipping on orders over $100
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-3">Description</h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-gray-600">{product.longDescription}</p>
            </div>

            {/* Quantity & Actions */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 w-16 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    handleAddToCart();
                    window.location.href = '/checkout';
                  }}
                >
                  Buy Now
                </Button>
              </div>

              <div className="flex gap-4 mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleWishlist}
                  className={isInWishlist ? 'text-red-600' : ''}
                >
                  <Heart className={`h-4 w-4 mr-2 ${isInWishlist ? 'fill-red-500' : ''}`} />
                  {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={shareProduct}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Truck className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Shield className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">2-Year Warranty</p>
                  <p className="text-sm text-gray-600">Extended protection</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <RefreshCw className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">30-Day Returns</p>
                  <p className="text-sm text-gray-600">Easy returns policy</p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">{key}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}