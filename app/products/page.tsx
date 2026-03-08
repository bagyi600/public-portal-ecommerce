'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, Grid, List, Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/cart-context';

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
    isFeatured: true
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
    isFeatured: false
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
    isFeatured: true
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
    isFeatured: false
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
    isFeatured: true
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
    isFeatured: false
  }
];

const categories = ['All Categories', 'Electronics', 'Wearables', 'Photography', 'Furniture', 'Computers'];

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Filter products
  const filteredProducts = mockProducts.filter(product => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory !== 'All Categories' && product.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.isNew ? 1 : -1;
      default: // featured
        return b.isFeatured ? 1 : -1;
    }
  });

  const handleAddToCart = (product: typeof mockProducts[0]) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: ''
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Our Products</h1>
          <p className="text-gray-600">Discover amazing products at great prices</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <div className="lg:w-1/4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      Search
                    </h3>
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`block w-full text-left px-3 py-2 rounded-lg ${
                            selectedCategory === category
                              ? 'bg-purple-100 text-purple-700 font-medium'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedCategory('All Categories');
                      setSearchQuery('');
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600">
                  {filteredProducts.length} products found
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>

                {/* View Toggle */}
                <div className="flex border rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {viewMode === 'grid' ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg"
                        >
                          <Heart className={`h-5 w-5 ${
                            wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''
                          }`} />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>

                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-semibold hover:text-purple-600 mb-2">
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
                            ({product.reviewCount})
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
                            <p className="text-xs text-gray-600 mt-1">
                              {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {sortedProducts.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Image */}
                        <div className="md:w-1/4">
                          <div className="relative aspect-square bg-gray-100 rounded-lg">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-3xl font-bold text-gray-700">
                                  {product.name.charAt(0)}
                                </div>
                                <p className="text-gray-600 text-sm">Image</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Info */}
                        <div className="md:w-3/4">
                          <div className="flex flex-col h-full">
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline" className="text-xs">
                                      {product.category}
                                    </Badge>
                                    {product.isFeatured && (
                                      <Badge className="bg-purple-100 text-purple-800 text-xs">
                                        Featured
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  <Link href={`/products/${product.id}`}>
                                    <h3 className="text-xl font-semibold hover:text-purple-600 mb-2">
                                      {product.name}
                                    </h3>
                                  </Link>
                                  
                                  <p className="text-gray-600 mb-4">
                                    {product.description}
                                  </p>
                                  
                                  <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-2">
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
                                        ({product.reviewCount} reviews)
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                
                                <button
                                  onClick={() => toggleWishlist(product.id)}
                                  className="p-2 hover:bg-gray-100 rounded-lg"
                                >
                                  <Heart className={`h-5 w-5 ${
                                    wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''
                                  }`} />
                                </button>
                              </div>
                            </div>

                            {/* Price & Actions */}
                            <div className="flex items-center justify-between pt-4 border-t">
                              <div>
                                <div className="flex items-center gap-3">
                                  <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                                  {product.originalPrice && (
                                    <>
                                      <span className="text-lg text-gray-500 line-through">
                                        ${product.originalPrice.toFixed(2)}
                                      </span>
                                      <Badge className="bg-red-100 text-red-800">
                                        Save ${(product.originalPrice - product.price).toFixed(2)}
                                      </Badge>
                                    </>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <Button
                                  variant="outline"
                                  onClick={() => handleAddToCart(product)}
                                >
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Add to Cart
                                </Button>
                                <Button onClick={() => window.location.href = `/products/${product.id}`}>
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}