'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import { Product, ProductFilters } from '@/types';
import { Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import Button from '@/components/ui/Button';

// Mock data for different categories
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'A timeless essential for every wardrobe',
    price: 29.99,
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
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit denim for everyday wear',
    price: 79.99,
    salePrice: 59.99,
    category: 'men',
    subcategory: 'jeans',
    brand: 'Denim Co',
    images: ['/placeholder-product.jpg'],
    sizes: [
      { label: '30', stock: 8 },
      { label: '32', stock: 12 },
      { label: '34', stock: 10 },
      { label: '36', stock: 6 },
    ],
    colors: [
      { name: 'Blue', hex: '#1e90ff' },
      { name: 'Black', hex: '#000000' },
    ],
    tags: ['casual', 'denim', 'slim-fit'],
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Cotton Polo Shirt',
    description: 'Classic polo for smart casual looks',
    price: 49.99,
    category: 'men',
    subcategory: 'shirts',
    brand: 'Classic Wear',
    images: ['/placeholder-product.jpg'],
    sizes: [
      { label: 'S', stock: 7 },
      { label: 'M', stock: 10 },
      { label: 'L', stock: 8 },
      { label: 'XL', stock: 5 },
    ],
    colors: [
      { name: 'Navy', hex: '#000080' },
      { name: 'White', hex: '#ffffff' },
      { name: 'Green', hex: '#228b22' },
    ],
    tags: ['polo', 'cotton', 'casual'],
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
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
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
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
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const sizeOptions = {
  men: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  women: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  kids: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-12Y', '13-14Y'],
};

const categoryInfo = {
  men: {
    title: "Men's Clothing",
    description: "Discover our latest collection of men's fashion",
    subcategories: ['All', 'T-Shirts', 'Shirts', 'Jeans', 'Pants', 'Shorts', 'Hoodies', 'Jackets', 'Accessories'],
  },
  women: {
    title: "Women's Clothing",
    description: "Trendy and stylish fashion for modern women",
    subcategories: ['All', 'Tops', 'Dresses', 'Jeans', 'Pants', 'Skirts', 'Hoodies', 'Jackets', 'Accessories'],
  },
  kids: {
    title: "Kids' Clothing",
    description: "Fun and comfortable clothing for children",
    subcategories: ['All', 'Boys', 'Girls', 'Babies', 'Tops', 'Bottoms', 'Dresses', 'Sets'],
  },
};

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = params.category as 'men' | 'women' | 'kids';
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');

  const info = categoryInfo[category];
  const allSizes = sizeOptions[category];

  // Filter products based on category and filters
  const filteredProducts = mockProducts.filter(product => {
    if (product.category !== category) return false;
    if (selectedSubcategory !== 'All' && product.subcategory !== selectedSubcategory.toLowerCase()) return false;
    if (selectedSizes.length > 0) {
      const hasSelectedSize = product.sizes.some(size => selectedSizes.includes(size.label));
      if (!hasSelectedSize) return false;
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    return true;
  });

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 200]);
    setSelectedSubcategory('All');
  };

  const activeFilterCount = selectedSizes.length + selectedColors.length +
    (selectedSubcategory !== 'All' ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0);

  return (
    <div className="bg-white">
      {/* Category Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{info.title}</h1>
          <p className="text-lg text-gray-600">{info.description}</p>

          {/* Subcategories */}
          <div className="flex flex-wrap gap-2 mt-4">
            {info.subcategories.map((subcat) => (
              <button
                key={subcat}
                onClick={() => setSelectedSubcategory(subcat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSubcategory === subcat
                    ? 'bg-black text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {subcat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Filter Controls */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-black text-white rounded-full px-2 py-0.5 text-xs">
                  {activeFilterCount}
                </span>
              )}
            </Button>

            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}

            <div className="text-sm text-gray-600">
              {filteredProducts.length} products found
            </div>
          </div>

          {/* View Mode */}
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-64 flex-shrink-0">
              <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                {/* Size Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {allSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeToggle(size)}
                        className={`py-2 px-3 rounded border text-sm font-medium transition-colors ${
                          selectedSizes.includes(size)
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Color</h3>
                  <div className="space-y-2">
                    {['Black', 'White', 'Blue', 'Red', 'Green', 'Gray'].map((color) => (
                      <label key={color} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedColors.includes(color)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedColors([...selectedColors, color]);
                            } else {
                              setSelectedColors(selectedColors.filter(c => c !== color));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm text-gray-700">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Min"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">
                  <Filter className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}