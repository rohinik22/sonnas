"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem } from './CartContext';

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone?: string;
  items: CartItem[];
  total: number;
  status: 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  createdAt: Date;
  estimatedDelivery?: Date;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (items: CartItem[], total: number, userInfo?: { id: string; name: string; email: string; phone?: string }) => Promise<string>;
  getOrderById: (orderId: string) => Order | undefined;
  getUserOrders: (userId: string) => Order[];
  getAllOrders: () => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(() => {
    // Load orders from localStorage on initialization
    if (typeof window !== 'undefined') {
      const storedOrders = localStorage.getItem('sonnas-orders');
      if (storedOrders) {
        try {
          const parsedOrders = JSON.parse(storedOrders);
          return parsedOrders.map((order: any) => ({
            ...order,
            createdAt: new Date(order.createdAt),
            estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined,
          }));
        } catch (error) {
          console.error('Error parsing stored orders:', error);
          return [];
        }
      }
    }
    return [];
  });

  const generateOrderId = (): string => {
    return 'ORD-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
  };

  const createOrder = async (
    items: CartItem[], 
    total: number, 
    userInfo?: { id: string; name: string; email: string; phone?: string }
  ): Promise<string> => {
    const orderId = generateOrderId();
    const estimatedDelivery = new Date();
    estimatedDelivery.setMinutes(estimatedDelivery.getMinutes() + 30); // 30 minutes from now

    // Use guest user info if not provided
    const finalUserInfo = userInfo || {
      id: 'guest-' + Date.now().toString(36),
      name: 'Guest User',
      email: 'guest@sonnas.com',
      phone: undefined
    };

    const newOrder: Order = {
      id: orderId,
      userId: finalUserInfo.id,
      userEmail: finalUserInfo.email,
      userName: finalUserInfo.name,
      userPhone: finalUserInfo.phone,
      items: [...items],
      total,
      status: 'confirmed',
      createdAt: new Date(),
      estimatedDelivery,
    };

    setOrders(prev => [...prev, newOrder]);
    
    // Store in localStorage for persistence
    const existingOrders = JSON.parse(localStorage.getItem('sonnas-orders') || '[]');
    existingOrders.push({
      ...newOrder,
      createdAt: newOrder.createdAt.toISOString(),
      estimatedDelivery: newOrder.estimatedDelivery?.toISOString(),
    });
    localStorage.setItem('sonnas-orders', JSON.stringify(existingOrders));

    return orderId;
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  const getUserOrders = (userId: string): Order[] => {
    return orders.filter(order => order.userId === userId).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const getAllOrders = (): Order[] => {
    return orders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));

    // Update in localStorage
    const existingOrders = JSON.parse(localStorage.getItem('sonnas-orders') || '[]');
    const updatedOrders = existingOrders.map((order: any) => 
      order.id === orderId ? { ...order, status } : order
    );
    localStorage.setItem('sonnas-orders', JSON.stringify(updatedOrders));
  };

  const value = {
    orders,
    createOrder,
    getOrderById,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}
