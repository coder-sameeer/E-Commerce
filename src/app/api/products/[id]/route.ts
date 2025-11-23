import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/types';

// Mock data - in a real app, this would come from a database
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    description: 'A timeless essential for every wardrobe. This classic white t-shirt is crafted from premium 100% cotton for superior comfort and durability. Perfect for layering or wearing on its own, this versatile piece features a regular fit, crew neckline, and short sleeves.',
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
  },
  {
    id: '2',
    name: 'Summer Floral Dress',
    description: 'Perfect for warm weather and special occasions, this beautiful floral dress features a lightweight fabric and elegant design.',
    price: 79.99,
    category: 'women',
    subcategory: 'dresses',
    brand: 'Summer Collection',
    images: [
      '/placeholder-product.jpg',
      '/placeholder-product.jpg',
      '/placeholder-product.jpg',
    ],
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
    id: '3',
    name: 'Kids Denim Jacket',
    description: 'Durable and stylish for everyday adventures. Perfect for active kids who need both comfort and style.',
    price: 49.99,
    category: 'kids',
    subcategory: 'jackets',
    brand: 'Kids Fashion',
    images: [
      '/placeholder-product.jpg',
      '/placeholder-product.jpg',
    ],
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = mockProducts.find(p => p.id === id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const productIndex = mockProducts.findIndex(p => p.id === id);

    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // In a real app, you would validate the data and update the database
    const updatedProduct: Product = {
      ...mockProducts[productIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    mockProducts[productIndex] = updatedProduct;

    return NextResponse.json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const productIndex = mockProducts.findIndex(p => p.id === id);

    if (productIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // In a real app, you would delete from the database
    mockProducts.splice(productIndex, 1);

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}