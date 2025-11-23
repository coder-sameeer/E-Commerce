'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Minus, Plus, Heart, Share2, Star, Truck, Shield, RefreshCw } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore, useWishlistStore } from '@/store';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

// Mock product data - in a real app, this would come from an API
const mockProduct: Product = {
  id: '1',
  name: 'Classic White T-Shirt',
  description: 'A timeless essential for every wardrobe, this classic white t-shirt is crafted from premium 100% cotton for superior comfort and durability. Perfect for layering or wearing on its own, this versatile piece features a regular fit, crew neckline, and short sleeves. The breathable fabric makes it ideal for year-round wear, while the timeless design ensures it will never go out of style.',
  price: 29.99,
  salePrice: 19.99,
  category: 'men',
  subcategory: 't-shirts',
  brand: 'Fashion Basics',
  images: [
    '/placeholder-product.jpg',
    '/placeholder-product.jpg',
    '/placeholder-product.jpg',
    '/placeholder-product.jpg',
  ],
  sizes: [
    { label: 'S', stock: 10 },
    { label: 'M', stock: 15 },
    { label: 'L', stock: 8 },
    { label: 'XL', stock: 5 },
    { label: 'XXL', stock: 0 },
  ],
  colors: [
    { name: 'White', hex: '#ffffff' },
    { name: 'Black', hex: '#000000' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Navy', hex: '#000080' },
  ],
  tags: ['casual', 'basic', 'summer', 'cotton'],
  featured: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Mock related products
const relatedProducts: Product[] = [
  {
    id: '2',
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit denim',
    price: 79.99,
    category: 'men',
    subcategory: 'jeans',
    brand: 'Denim Co',
    images: ['/placeholder-product.jpg'],
    sizes: [
      { label: '30', stock: 8 },
      { label: '32', stock: 12 },
      { label: '34', stock: 10 },
    ],
    colors: [{ name: 'Blue', hex: '#1e90ff' }],
    tags: ['denim', 'slim-fit'],
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Cotton Polo Shirt',
    description: 'Classic polo for smart casual',
    price: 49.99,
    category: 'men',
    subcategory: 'shirts',
    brand: 'Classic Wear',
    images: ['/placeholder-product.jpg'],
    sizes: [
      { label: 'S', stock: 7 },
      { label: 'M', stock: 10 },
      { label: 'L', stock: 8 },
    ],
    colors: [{ name: 'Navy', hex: '#000080' }],
    tags: ['polo', 'cotton'],
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function ProductPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(mockProduct.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const router = useRouter();

  const selectedSizeStock = mockProduct.sizes.find(s => s.label === selectedSize)?.stock || 0;
  const discount = mockProduct.salePrice
    ? Math.round(((mockProduct.price - mockProduct.salePrice) / mockProduct.price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }

    addItem(mockProduct, quantity, selectedSize, selectedColor.name);
    openCart();
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > selectedSizeStock) return;
    setQuantity(newQuantity);
  };

  const handleSizeClick = (size: string) => {
    const sizeStock = mockProduct.sizes.find(s => s.label === size)?.stock || 0;
    if (sizeStock > 0) {
      setSelectedSize(size);
      setQuantity(1); // Reset quantity when size changes
    }
  };

  const handleColorClick = (color: typeof mockProduct.colors[0]) => {
    setSelectedColor(color);
    setSelectedImageIndex(0); // Reset to first image when color changes
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <button onClick={() => router.push('/')} className="text-gray-500 hover:text-gray-700">
                Home
              </button>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <button
                onClick={() => router.push(`/${mockProduct.category}`)}
                className="text-gray-500 hover:text-gray-700 capitalize"
              >
                {mockProduct.category}
              </button>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900">{mockProduct.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={mockProduct.images[selectedImageIndex] || '/placeholder-product.jpg'}
                alt={mockProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index
                      ? 'border-black'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image || '/placeholder-product.jpg'}
                    alt={`${mockProduct.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Title and Price */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockProduct.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.0 out of 5 stars)</span>
                <span className="text-sm text-gray-600">|</span>
                <span className="text-sm text-gray-600">242 reviews</span>
              </div>
              <div className="flex items-center gap-3">
                {mockProduct.salePrice ? (
                  <>
                    <span className="text-3xl font-bold text-gray-900">
                      {formatPrice(mockProduct.salePrice)}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(mockProduct.price)}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                      -{discount}%
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(mockProduct.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Color: {selectedColor.name}</h3>
              <div className="flex items-center gap-2">
                {mockProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorClick(color)}
                    className={`relative h-8 w-8 rounded-full border-2 transition-all ${
                      selectedColor.name === color.name
                        ? 'border-black scale-110'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor.name === color.name && (
                      <div className="absolute inset-0 rounded-full border-2 border-white pointer-events-none"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {mockProduct.sizes.map((size) => {
                  const isOutOfStock = size.stock === 0;
                  const isSelected = selectedSize === size.label;
                  return (
                    <button
                      key={size.label}
                      onClick={() => handleSizeClick(size.label)}
                      disabled={isOutOfStock}
                      className={`py-2 px-3 border rounded-lg text-sm font-medium transition-all ${
                        isSelected
                          ? 'border-black bg-black text-white'
                          : isOutOfStock
                          ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                          : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      {size.label}
                    </button>
                  );
                })}
              </div>
              {selectedSize && (
                <p className="text-sm text-gray-600 mt-2">
                  {selectedSizeStock > 0
                    ? `${selectedSizeStock} in stock`
                    : 'Out of stock'}
                </p>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none"
                    min="1"
                    max={selectedSizeStock || 1}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= selectedSizeStock}
                    className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={!selectedSize || selectedSizeStock === 0}
                  className="flex-1"
                  size="lg"
                >
                  Add to Cart
                </Button>
                <button
                  onClick={() => toggleItem(mockProduct)}
                  className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isInWishlist(mockProduct.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share2 className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">1-year warranty on all products</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-600">30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <div className="prose prose-gray max-w-none">
                <p>{mockProduct.description}</p>
                <h3 className="text-lg font-semibold mt-6 mb-3">Features</h3>
                <ul className="space-y-2">
                  <li>Premium 100% cotton fabric</li>
                  <li>Regular fit for comfortable wear</li>
                  <li>Crew neckline</li>
                  <li>Short sleeves</li>
                  <li>Machine washable</li>
                  <li>Imported</li>
                </ul>
                <h3 className="text-lg font-semibold mt-6 mb-3">Care Instructions</h3>
                <ul className="space-y-2">
                  <li>Machine wash cold with like colors</li>
                  <li>Do not bleach</li>
                  <li>Tumble dry low</li>
                  <li>Iron on low heat if needed</li>
                  <li>Do not dry clean</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Brand</span>
                  <span className="font-medium">{mockProduct.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium capitalize">{mockProduct.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subcategory</span>
                  <span className="font-medium capitalize">{mockProduct.subcategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Material</span>
                  <span className="font-medium">100% Cotton</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fit</span>
                  <span className="font-medium">Regular</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Origin</span>
                  <span className="font-medium">Imported</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => {
                // Import ProductCard here or create a simple card component
                return (
                  <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gray-100"></div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                      <p className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}