import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Banknote, Shield } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { Customer } from '../types';

interface CheckoutProps {
  onNavigate: (page: string) => void;
}

export default function Checkout({ onNavigate }: CheckoutProps) {
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [customer, setCustomer] = useState<Customer>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');

  const shipping = cart.total >= 500 ? 0 : 50;
  const total = cart.total + shipping;

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'bkash', name: 'bKash', icon: Smartphone },
    { id: 'nagad', name: 'Nagad', icon: Smartphone },
    { id: 'rocket', name: 'Rocket', icon: Smartphone },
    { id: 'cod', name: 'Cash on Delivery', icon: Banknote }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Process order
      alert('Order placed successfully!');
      clearCart();
      onNavigate('home');
    }
  };

  const updateCustomer = (field: keyof Customer, value: string) => {
    setCustomer(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : onNavigate('cart')}
            className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            {step > 1 ? 'Previous Step' : 'Back to Cart'}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress Indicator */}
        <div className="flex items-center mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold ${
                step >= stepNumber ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`flex-1 h-1 mx-2 ${
                  step > stepNumber ? 'bg-green-600' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Customer Information */}
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={customer.firstName}
                          onChange={(e) => updateCustomer('firstName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={customer.lastName}
                          onChange={(e) => updateCustomer('lastName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={customer.email}
                          onChange={(e) => updateCustomer('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={customer.phone}
                          onChange={(e) => updateCustomer('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={customer.address}
                          onChange={(e) => updateCustomer('address', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={customer.city}
                          onChange={(e) => updateCustomer('city', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          value={customer.postalCode}
                          onChange={(e) => updateCustomer('postalCode', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Shipping & Payment */}
                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping & Payment</h2>
                    
                    {/* Shipping Method */}
                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Shipping Method</h3>
                      <div className="space-y-2">
                        <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="shipping"
                            value="standard"
                            checked={shippingMethod === 'standard'}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="text-green-600 focus:ring-green-500"
                          />
                          <div className="ml-3">
                            <p className="font-medium">Standard Delivery (3-5 days)</p>
                            <p className="text-sm text-gray-600">{shipping === 0 ? 'Free' : '৳50'}</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Payment Method</h3>
                      <div className="space-y-2">
                        {paymentMethods.map((method) => {
                          const Icon = method.icon;
                          return (
                            <label
                              key={method.id}
                              className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                            >
                              <input
                                type="radio"
                                name="payment"
                                value={method.id}
                                checked={paymentMethod === method.id}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="text-green-600 focus:ring-green-500"
                                required
                              />
                              <Icon className="h-5 w-5 text-gray-600 ml-3 mr-2" />
                              <span className="font-medium">{method.name}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Order Review */}
                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Order</h2>
                    
                    {/* Customer Info Review */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                      <p className="text-gray-700">
                        {customer.firstName} {customer.lastName}<br />
                        {customer.address}<br />
                        {customer.city}, {customer.postalCode}<br />
                        {customer.phone}
                      </p>
                    </div>

                    {/* Payment Method Review */}
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                      <p className="text-gray-700">
                        {paymentMethods.find(m => m.id === paymentMethod)?.name}
                      </p>
                    </div>

                    {/* Security Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="text-sm text-blue-800 font-medium">
                          Your payment information is secure and encrypted
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                  >
                    {step === 1 ? 'Continue to Shipping' : 
                     step === 2 ? 'Review Order' : 
                     'Place Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{item.product.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">৳{item.product.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">৳{cart.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `৳${shipping}`}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>৳{total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}