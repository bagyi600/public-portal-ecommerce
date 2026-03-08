'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    rating: number;
    isNew?: boolean;
    isFeatured?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: ''
    });
  };

  const toggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-700 mb-2">
                {product.name.charAt(0)}
              </div>
              <p className="text-gray-600">Product Image</p>
            </div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {product.isNew && (
              <Badge className="bg-green-100 text-green-800">New</Badge>
            )}
            {product.isFeatured && (
              <Badge className="bg-purple-100 text-purple-800">Featured</Badge>
            )}
          </div>
          
          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg"
          >
            <Heart className={`h-5 w-5 ${
              isInWishlist ? 'fill-red-500 text-red-500' : ''
            }`} />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold hover:text-purple-600 mb-2 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating.toFixed(1)}
            </span>
          </div>

          {/* Price & Actions */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-xs text-green-600 mt-1">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </p>
              )}
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}