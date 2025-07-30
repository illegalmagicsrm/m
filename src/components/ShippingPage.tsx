import React from 'react';
import { ArrowLeft, Truck, Clock, MapPin, Package, Shield } from 'lucide-react';

interface ShippingPageProps {
  onNavigate: (page: string) => void;
}

export default function ShippingPage({ onNavigate }: ShippingPageProps) {
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
            Back to Home
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <Truck className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Shipping Information
          </h1>
          <p className="text-xl md:text-2xl text-blue-100">
            Fast, reliable delivery across Bangladesh
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Shipping Rates */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Package className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Shipping Rates</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 text-white p-2 rounded-full mr-3">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-green-800">Standard Delivery</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">All Districts:</span>
                  <span className="font-bold text-green-600">৳120</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Delivery Time:</span>
                  <span className="font-medium">2-5 Business Days</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white p-2 rounded-full mr-3">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-blue-800">Free Shipping</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Orders Over:</span>
                  <span className="font-bold text-blue-600">৳1000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">All Districts:</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
            <p className="text-yellow-800 font-medium">
              💡 <strong>Pro Tip:</strong> Add just ৳{1000 - 800} more to your cart to qualify for FREE shipping!
            </p>
          </div>
        </div>

        {/* Delivery Areas */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <MapPin className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Delivery Areas</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Dhaka Division</h3>
              <p className="text-gray-600 mb-2">1-2 Business Days</p>
              <p className="text-sm text-gray-500">Dhaka, Gazipur, Narayanganj, Manikganj, Munshiganj</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Major Cities</h3>
              <p className="text-gray-600 mb-2">2-3 Business Days</p>
              <p className="text-sm text-gray-500">Chittagong, Sylhet, Rajshahi, Khulna, Barisal</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Other Areas</h3>
              <p className="text-gray-600 mb-2">3-5 Business Days</p>
              <p className="text-sm text-gray-500">All other districts across Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Shipping Process */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How Shipping Works</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Order Processing</h3>
                <p className="text-gray-600">
                  Orders are processed within 24 hours of payment confirmation. You'll receive an email with tracking information.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Packaging</h3>
                <p className="text-gray-600">
                  Products are carefully packaged in eco-friendly materials to ensure they arrive in perfect condition.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Dispatch</h3>
                <p className="text-gray-600">
                  Your order is dispatched via our trusted courier partners with real-time tracking available.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Delivery</h3>
                <p className="text-gray-600">
                  Receive your organic products at your doorstep. Cash on delivery available for your convenience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6 text-center">Important Shipping Notes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3">📦 Packaging</h3>
              <ul className="space-y-2 text-green-100">
                <li>• Secure, eco-friendly packaging</li>
                <li>• Products sealed for freshness</li>
                <li>• Fragile items get extra protection</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">📞 Contact</h3>
              <ul className="space-y-2 text-green-100">
                <li>• Track your order anytime</li>
                <li>• Call us for delivery updates</li>
                <li>• WhatsApp support available</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">💰 Payment</h3>
              <ul className="space-y-2 text-green-100">
                <li>• Cash on Delivery available</li>
                <li>• Mobile wallet payments accepted</li>
                <li>• Secure online payment gateway</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">🔄 Returns</h3>
              <ul className="space-y-2 text-green-100">
                <li>• 7-day return policy</li>
                <li>• Free return shipping</li>
                <li>• Full refund guarantee</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Questions about shipping?
          </h2>
          <p className="text-gray-600 mb-6">
            Our customer service team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+8801234567890"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              📞 Call: +880 1234-567890
            </a>
            <a
              href="mailto:info@malihasmiracle.com"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              ✉️ Email: info@malihasmiracle.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}