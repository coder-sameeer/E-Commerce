import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/types';

// Mock data - in a real app, this would come from a database
const mockProducts: Product[] = [
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
  {
    id: '5',
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
    id: '6',
    name: 'Elegant Evening Dress',
    description: 'Stunning dress for special occasions',
    price: 149.99,
    category: 'women',
    subcategory: 'dresses',
    brand: 'Elegant Collection',
    images: ['/placeholder-product.jpg'],
    sizes: [
      { label: 'XS', stock: 5 },
      { label: 'S', stock: 8 },
      { label: 'M', stock: 7 },
      { label: 'L', stock: 4 },
    ],
    colors: [
      { name: 'Red', hex: '#ff0000' },
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
    ],
    tags: ['formal', 'evening', 'dress'],
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const sortBy = searchParams.get('sortBy') || 'popular';

    let filteredProducts = [...mockProducts];

    // Apply filters
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    if (subcategory) {
      filteredProducts = filteredProducts.filter(p => p.subcategory === subcategory);
    }

    if (featured === 'true') {
      filteredProducts = filteredProducts.filter(p => p.featured);
    }

    // Apply sorting
    switch (sortBy) {
      case 'new':
        filteredProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price_low':
        filteredProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price_high':
        filteredProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'popular':
      default:
        // Keep original order or implement popularity logic
        break;
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const response = {
      success: true,
      data: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        pages: Math.ceil(filteredProducts.length / limit),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // In a real app, you would validate the data and save to database
    const newProduct: Product = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockProducts.push(newProduct);

    return NextResponse.json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}