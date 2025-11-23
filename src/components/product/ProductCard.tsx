'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore, useWishlistStore } from '@/store';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Add with default size and color (first available)
    const defaultSize = product.sizes.find(s => s.stock > 0)?.label || product.sizes[0]?.label;
    const defaultColor = product.colors[0]?.name;

    if (defaultSize && defaultColor) {
      addItem(product, 1, defaultSize, defaultColor);
      openCart();
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
  };

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <Image
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Product Badges */}
          <div className="absolute top-2 left-2 space-y-1">
            {product.featured && (
              <Badge variant="primary" size="sm">New</Badge>
            )}
            {discount > 0 && (
              <Badge variant="error" size="sm">-{discount}%</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow focus:outline-none"
          >
            <Heart
              className={`h-4 w-4 ${
                isInWishlist(product.id)
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600 hover:text-red-500'
              }`}
            />
          </button>

          {/* Quick Add Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              onClick={handleQuickAdd}
              className="w-full"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium text-gray-900 truncate group-hover:text-black transition-colors">
              {product.name}
            </h3>
            <button
              onClick={handleToggleWishlist}
              className="flex-shrink-0 ml-2 lg:hidden"
            >
              <Heart
                className={`h-4 w-4 ${
                  isInWishlist(product.id)
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400 hover:text-red-500'
                }`}
              />
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">(4.0)</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            {product.salePrice ? (
              <>
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.salePrice)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div className="flex items-center space-x-1 mt-2">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}