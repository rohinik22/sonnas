"use client";
import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Trash2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';

export default function CartSidebar() {
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);
  
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    getTotalItems,
    getTotalPrice 
  } = useCart();
  
  const { createOrder } = useOrder();
  const { user, isAuthenticated, setIsLoginModalOpen } = useAuth();

  const handleProceedToCheckout = async () => {
    if (cartItems.length === 0) return;

    setIsProcessingOrder(true);
    
    try {
      // Create order with user info if authenticated, otherwise as guest
      const userInfo = isAuthenticated && user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      } : undefined;

      const orderId = await createOrder(
        cartItems,
        getTotalPrice(),
        userInfo
      );
      
      setOrderSuccess(orderId);
      clearCart();
      
      // Show success message for 8 seconds then close
      setTimeout(() => {
        setOrderSuccess(null);
        setIsCartOpen(false);
      }, 8000);
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setIsProcessingOrder(false);
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5 text-red-600" />
            <h2 className="text-lg font-semibold text-white">
              Your Cart ({getTotalItems()})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-200px)]">
          {orderSuccess ? (
            /* Order Success Message */
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-green-500 text-xl font-semibold mb-2">Order Confirmed! 🎉</h3>
              <p className="text-gray-300 mb-2">Order ID: <span className="font-mono text-green-400">{orderSuccess}</span></p>
              <p className="text-gray-400 text-sm mb-4">Your order has been successfully placed!</p>
              <p className="text-gray-500 text-xs">
                {isAuthenticated 
                  ? "Track your order anytime using the Order ID" 
                  : "Save this Order ID to track your order later"}
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <ShoppingCart className="h-12 w-12 text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-500 text-sm">Add some delicious items to get started!</p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="bg-gray-800 rounded-lg p-3 flex items-center space-x-3">
                  {/* Item Image */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium text-sm truncate">{item.name}</h3>
                    <p className="text-gray-400 text-xs truncate">{item.description}</p>
                    <p className="text-red-600 font-semibold text-sm">₹{item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
                    >
                      <Minus className="h-4 w-4 text-white" />
                    </button>
                    
                    <span className="text-white font-medium min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
                    >
                      <Plus className="h-4 w-4 text-white" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              ))}

              {/* Clear Cart Button */}
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors text-sm"
                >
                  Clear Cart
                </button>
              )}
            </>
          )}
        </div>

        {/* Footer - Total and Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-700 p-4 space-y-3">
            {/* Total */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-white">Total:</span>
              <span className="text-xl font-bold text-red-600">₹{getTotalPrice().toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button 
              onClick={handleProceedToCheckout}
              disabled={isProcessingOrder || orderSuccess !== null}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
            >
              {isProcessingOrder ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Processing Order...</span>
                </>
              ) : (
                <span>Proceed to Checkout</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
