"use client";
import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginModal() {
  const { isLoginModalOpen, setIsLoginModalOpen, login, register } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isLoginModalOpen) return null;

  // Check if user is trying to order (for better UX messaging)
  const isOrderingIntent = localStorage.getItem('postLoginAction') === 'navigateToMenu';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let success = false;
      
      if (isLoginMode) {
        success = await login(formData.email, formData.password);
        if (!success) {
          setError('Invalid email or password');
        }
      } else {
        if (!formData.name.trim()) {
          setError('Name is required');
          setIsLoading(false);
          return;
        }
        if (!formData.phone.trim()) {
          setError('WhatsApp number is required for order confirmations');
          setIsLoading(false);
          return;
        }
        if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
          setError('Please enter a valid 10-digit phone number');
          setIsLoading(false);
          return;
        }
        success = await register(formData.name, formData.email, formData.password, formData.phone);
        if (!success) {
          setError('Email already exists or registration failed');
        }
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }

    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError(''); // Clear error when user types
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', phone: '' });
    setError('');
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    resetForm();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsLoginModalOpen(false)}
      />
      
      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-lg shadow-xl w-full max-w-md transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {isLoginMode ? 'Login to Your Account' : 'Create New Account'}
              </h2>
              {isOrderingIntent && (
                <p className="text-sm text-gray-400 mt-1">
                  Please login to continue with your order
                </p>
              )}
            </div>
            <button
              onClick={() => {
                setIsLoginModalOpen(false);
                // Clear the post-login action if user cancels
                localStorage.removeItem('postLoginAction');
              }}
              className="p-1 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name field (only for registration) */}
            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Enter your full name"
                    required={!isLoginMode}
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Phone field (only for registration) */}
            {!isLoginMode && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    placeholder="Enter your WhatsApp number (10 digits)"
                    required={!isLoginMode}
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Required for order confirmations via WhatsApp</p>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-100/10 p-2 rounded">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
            >
              {isLoading ? 'Please wait...' : (
                isOrderingIntent 
                  ? (isLoginMode ? 'Login & Continue Order' : 'Create Account & Order') 
                  : (isLoginMode ? 'Login' : 'Create Account')
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="px-6 pb-6 text-center">
            <p className="text-gray-400 text-sm">
              {isLoginMode ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={switchMode}
                className="text-red-600 hover:text-red-500 font-medium"
              >
                {isLoginMode ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
