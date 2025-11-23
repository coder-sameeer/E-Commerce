import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, TrendingUp, Truck } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types';

// Mock data for demonstration
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'A timeless essential for every wardrobe',
    price: 29.99,
    salePrice: 19.99,
    category: 'men',
    subcategory: 't-shirts',
    brand: 'Fashion Basics',
    images: ['/placeholder-product.jpg'],
    sizes: [
      { label: 'S', stock: 10 },
      { label: 'M', stock: 15 },
      { label: 'L', stock: 8 },
      { label: 'XL', stock: 5 },
    ],
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Black', hex: '#000000' },
      { name: 'Gray', hex: '#808080' },
    ],
    tags: ['casual', 'basic', 'summer'],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Summer Floral Dress',
    description: 'Perfect for warm weather and special occasions',
    price: 79.99,
    category: 'women',
    subcategory: 'dresses',
    brand: 'Summer Collection',
    images: ['/placeholder-product.jpg'],
    sizes: [
      { label: 'XS', stock: 8 },
      { label: 'S', stock: 12 },
      { label: 'M', stock: 10 },
      { label: 'L', stock: 6 },
    ],
    colors: [
      { name: 'Floral', hex: '#ff69b4' },
      { name: 'Blue', hex: '#4169e1' },
    ],
    tags: ['summer', 'dress', 'floral'],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Kids Denim Jacket',
    description: 'Durable and stylish for everyday adventures',
    price: 49.99,
    category: 'kids',
    subcategory: 'jackets',
    brand: 'Kids Fashion',
    images: ['/placeholder-product.jpg'],
    sizes: [
      { label: '2-3Y', stock: 7 },
      { label: '4-5Y', stock: 10 },
      { label: '6-7Y', stock: 8 },
      { label: '8-9Y', stock: 5 },
    ],
    colors: [
      { name: 'Blue', hex: '#1e90ff' },
      { name: 'Black', hex: '#000000' },
    ],
    tags: ['kids', 'denim', 'jacket'],
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Premium Cotton Hoodie',
    description: 'Comfort and style in one perfect package',
    price: 89.99,
    category: 'men',
    subcategory: 'hoodies',
    brand: 'Premium Wear',
    images: ['/placeholder-product.jpg'],
    sizes: [
      { label: 'S', stock: 6 },
      { label: 'M', stock: 12 },
      { label: 'L', stock: 10 },
      { label: 'XL', stock: 8 },
      { label: 'XXL', stock: 4 },
    ],
    colors: [
      { name: 'Gray', hex: '#808080' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Black', hex: '#000000' },
    ],
    tags: ['hoodie', 'premium', 'cotton'],
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const categories = [
  {
    name: 'Men',
    href: '/men',
    description: 'Discover our latest collection for men',
    image: '/categories/men.jpg',
    color: 'from-blue-500 to-blue-700',
  },
  {
    name: 'Women',
    href: '/women',
    description: 'Trendy styles for modern women',
    image: '/categories/women.jpg',
    color: 'from-pink-500 to-pink-700',
  },
  {
    name: 'Kids',
    href: '/kids',
    description: 'Fun and comfortable for little ones',
    image: '/categories/kids.jpg',
    color: 'from-purple-500 to-purple-700',
  },
];

const collections = [
  {
    name: 'Summer Essentials',
    href: '/collection/summer-essentials',
    description: 'Light and breezy for hot days',
    image: '/collections/summer.jpg',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    name: 'Streetwear',
    href: '/collection/streetwear',
    description: 'Urban style meets comfort',
    image: '/collections/streetwear.jpg',
    color: 'from-gray-700 to-gray-900',
  },
  {
    name: 'Formal Wear',
    href: '/collection/formal-wear',
    description: 'Elegant pieces for special occasions',
    image: '/collections/formal.jpg',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    name: 'Accessories',
    href: '/collection/accessories',
    description: 'Complete your look with our accessories',
    image: '/collections/accessories.jpg',
    color: 'from-green-500 to-teal-600',
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                New Season
                <br />
                Collection
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Discover the latest trends in fashion. Premium quality at affordable prices for the whole family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
                  View Lookbook
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-black text-white p-3 rounded-full mb-4">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-black text-white p-3 rounded-full mb-4">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Premium Quality</h3>
              <p className="text-gray-600">Carefully selected materials</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-black text-white p-3 rounded-full mb-4">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Latest Trends</h3>
              <p className="text-gray-600">Always in style</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Find the perfect style for everyone</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-lg bg-gray-100 aspect-[4/5] hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`}></div>
                <div className="relative h-full flex flex-col justify-end p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/90 mb-4">{category.description}</p>
                  <div className="flex items-center text-white hover:translate-x-1 transition-transform">
                    <span className="font-medium">Shop {category.name}</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600">Handpicked favorites from our collection</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Collection</h2>
            <p className="text-lg text-gray-600">Curated collections for every occasion</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.name}
                href={collection.href}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] hover:shadow-lg transition-shadow duration-300"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.color}`}></div>
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{collection.name}</h3>
                  <p className="text-white/90 text-sm mb-3">{collection.description}</p>
                  <div className="flex items-center text-white/80 hover:text-white group-hover:translate-x-1 transition-all">
                    <span className="text-sm font-medium">Shop Now</span>
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay in the Loop
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to our newsletter for exclusive offers, new arrivals, and fashion tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-black hover:bg-gray-100">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
