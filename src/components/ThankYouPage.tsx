import React, { useEffect, useState } from 'react';
import { CheckCircle, Package, CreditCard, Phone, Mail, ArrowLeft } from 'lucide-react';

interface ThankYouPageProps {
  onNavigate: (page: string) => void;
}

interface OrderData {
  orderNumber: string;
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }>;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  paymentMethod: string;
  shipping: {
    cost: number;
    address: string;
  };
  createdAt: string;
}

export default function ThankYouPage({ onNavigate }: ThankYouPageProps) {
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem('currentOrder');
    if (storedOrder) {
      setOrderData(JSON.parse(storedOrder));
    }
  }, []);

  const handlePayment = () => {
    // This will be replaced with real payment gateway later
    window.open('https://secure.aamarpay.com/payment-gateway', '_blank');
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
          <button
            onClick={() => onNavigate('home')}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-gray-600 hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Order Received Successfully!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for choosing Maliha's Miracle
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center mb-6">
                <Package className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
              </div>

              <div className="border-b pb-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-bold text-lg text-green-600">{orderData.orderNumber}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="font-medium">{new Date(orderData.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Ordered Items */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Items Ordered:</h3>
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">৳{item.product.price * item.quantity}</p>
                      <p className="text-sm text-gray-600">৳{item.product.price} each</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4 mt-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">৳{orderData.total - orderData.shipping.cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">
                      {orderData.shipping.cost === 0 ? 'Free' : `৳${orderData.shipping.cost}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-green-600">৳{orderData.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Name:</span> {orderData.customer.name}</p>
                <p><span className="font-medium">Email:</span> {orderData.customer.email}</p>
                <p><span className="font-medium">Phone:</span> {orderData.customer.phone}</p>
                <p><span className="font-medium">Address:</span> {orderData.shipping.address}</p>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <div className="flex items-center mb-6">
                <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Complete Payment</h2>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800 font-medium mb-2">
                  Your order has been received!
                </p>
                <p className="text-blue-700 text-sm">
                  Please continue to payment to confirm your order. We'll start processing once payment is received.
                </p>
              </div>

              <div className="mb-6">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Amount to Pay:</span>
                    <span className="text-2xl font-bold text-green-600">৳{orderData.total}</span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg mb-4"
                >
                  Pay with Mobile Wallet
                  <div className="text-sm font-normal mt-1">bKash • Nagad • Rocket</div>
                </button>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-800 text-sm">
                    <strong>After payment:</strong> We'll confirm your order by email or phone within 2 hours.
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Need Help?</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>+880 1234-567890</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>info@malihasmiracle.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <h4 className="font-medium text-green-800">Complete Payment</h4>
              <p className="text-sm text-green-700">Pay securely using your mobile wallet</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h4 className="font-medium text-green-800">Order Confirmation</h4>
              <p className="text-sm text-green-700">We'll confirm via email/phone</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <h4 className="font-medium text-green-800">Fast Delivery</h4>
              <p className="text-sm text-green-700">Receive your organic products in 2-5 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}