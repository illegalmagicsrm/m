import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export default function CartPanel({ isOpen, onClose, onNavigate }: CartPanelProps) {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const shipping = cart.total >= 500 ? 0 : 50;
  const finalTotal = cart.total - discount + shipping;

  const applyPromoCode = () => {
    const validPromoCodes: { [key: string]: number } = {
      'SAVE10': 0.1,
      'WELCOME15': 0.15,
      'ORGANIC20': 0.2
    };

    if (validPromoCodes[promoCode.toUpperCase()]) {
      const discountAmount = cart.total * validPromoCodes[promoCode.toUpperCase()];
      setDiscount(discountAmount);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code');
    }
  };

  const handleCheckout = () => {
    onClose();
    onNavigate('checkout');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center">
              <ShoppingBag className="h-6 w-6 mr-2" />
              <h2 className="text-xl font-bold">Your Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-600 mb-6">Add some products to get started</p>
                <button
                  onClick={onClose}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{item.product.name}</h3>
                        <p className="text-green-600 font-bold">৳{item.product.price}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Promo Code */}
                <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      disabled={promoApplied}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100"
                    />
                    <button
                      onClick={applyPromoCode}
                      disabled={promoApplied || !promoCode}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Tag className="h-4 w-4 mr-1" />
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-green-600 text-sm mt-2">✓ Promo code applied!</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer with totals and checkout */}
          {cart.items.length > 0 && (
            <div className="border-t p-6 bg-gray-50">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">৳{cart.total}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-৳{discount}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `৳${shipping}`}
                  </span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>৳{finalTotal}</span>
                  </div>
                </div>
              </div>

              {cart.total >= 500 && (
                <div className="bg-green-100 border border-green-200 rounded-lg p-3 mb-4">
                  <p className="text-green-800 text-sm font-medium">
                    🎉 You qualify for free shipping!
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Go to Checkout
              </button>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
}