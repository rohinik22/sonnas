"use client";
import React, { useState } from 'react';
import { Search, Clock, CheckCircle, Truck, Package, X } from 'lucide-react';
import { useOrder } from '@/contexts/OrderContext';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderTrackingModal({ isOpen, onClose }: OrderTrackingModalProps) {
  const [orderId, setOrderId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const { getOrderById, getUserOrders } = useOrder();
  const { user, isAuthenticated } = useAuth();

  if (!isOpen) return null;

  const handleSearch = () => {
    if (orderId.trim()) {
      const order = getOrderById(orderId.trim());
      setSearchedOrder(order || null);
    }
  };

  const userOrders = isAuthenticated ? getUserOrders(user?.id || '') : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'preparing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'ready':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <Truck className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Order Confirmed';
      case 'preparing':
        return 'Preparing Your Order';
      case 'ready':
        return 'Ready for Pickup/Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return 'Processing';
    }
  };

  const OrderCard = ({ order }: { order: any }) => (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-white font-semibold">Order #{order.id}</h3>
          <p className="text-gray-400 text-sm">
            {new Date(order.createdAt).toLocaleString('en-IN')}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon(order.status)}
          <span className="text-sm text-gray-300">{getStatusText(order.status)}</span>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        {order.items.map((item: any, index: number) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm">{item.name}</p>
              <p className="text-gray-400 text-xs">Qty: {item.quantity} × ₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-700">
        <span className="text-gray-300">Total: ₹{order.total.toFixed(2)}</span>
        {order.estimatedDelivery && order.status !== 'delivered' && (
          <span className="text-sm text-yellow-500">
            ETA: {new Date(order.estimatedDelivery).toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="absolute inset-4 md:inset-8 lg:inset-16 bg-gray-900 rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Track Your Order</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {/* Search Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Search by Order ID</h3>
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Enter Order ID (e.g., ORD-123ABC)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-red-500"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
            </div>

            {/* Search Result */}
            {orderId && (
              <div className="mt-4">
                {searchedOrder ? (
                  <OrderCard order={searchedOrder} />
                ) : orderId.length > 5 ? (
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                    <p className="text-gray-400 text-center">No order found with ID: {orderId}</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* User Orders Section */}
          {isAuthenticated && userOrders.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Your Recent Orders</h3>
              <div className="space-y-4">
                {userOrders.slice(0, 5).map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            </div>
          )}

          {/* No Orders Message */}
          {isAuthenticated && userOrders.length === 0 && !orderId && (
            <div className="text-center py-8">
              <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No orders found</p>
              <p className="text-gray-500 text-sm">Place your first order to see it here!</p>
            </div>
          )}

          {/* Not Logged In Message */}
          {!isAuthenticated && (
            <div className="text-center py-8">
              <p className="text-gray-400 text-lg mb-2">Login to view your order history</p>
              <p className="text-gray-500 text-sm">Or use the search above to track any order with Order ID</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
