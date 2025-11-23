'use client';

import { useCartStore } from '@/store';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { X, Minus, Plus, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';

export default function ShoppingCart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeItem(itemId);
  };

  if (items.length === 0) {
    return (
      <Modal isOpen={isOpen} onClose={closeCart} size="sm">
        <div className="text-center py-8">
          <ShoppingCartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-4">Looks like you haven't added any items yet.</p>
          <Button onClick={closeCart}>Continue Shopping</Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={closeCart} size="lg">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">
            Shopping Cart ({getItemCount()} {getItemCount() === 1 ? 'item' : 'items'})
          </h2>
          <button
            onClick={closeCart}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto mb-4">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.product.images[0] || '/placeholder-product.jpg'}
                    alt={item.product.name}
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Size: {item.size} | Color: {item.color}
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPrice(item.product.price)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="p-1 rounded-full border border-gray-300 hover:bg-gray-50 focus:outline-none"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="p-1 rounded-full border border-gray-300 hover:bg-gray-50 focus:outline-none"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-xs text-red-600 hover:text-red-700 focus:outline-none"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium text-gray-900">Total</span>
            <span className="text-lg font-bold text-gray-900">{formatPrice(getTotal())}</span>
          </div>

          <div className="space-y-2">
            <Link href="/checkout" onClick={closeCart}>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={closeCart}
              className="w-full"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}