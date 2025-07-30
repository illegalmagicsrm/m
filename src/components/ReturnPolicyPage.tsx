import React from 'react';
import { ArrowLeft, RotateCcw, Shield, Clock, CheckCircle, XCircle } from 'lucide-react';

interface ReturnPolicyPageProps {
  onNavigate: (page: string) => void;
}

export default function ReturnPolicyPage({ onNavigate }: ReturnPolicyPageProps) {
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
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <RotateCcw className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Return Policy
          </h1>
          <p className="text-xl md:text-2xl text-green-100">
            Your satisfaction is our priority
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Policy Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">7-Day Return Guarantee</h2>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
            <p className="text-green-800 text-lg leading-relaxed">
              At Maliha's Miracle, we stand behind the quality of our organic products. 
              If you're not completely satisfied with your purchase, you can return it 
              within <strong>7 days</strong> of delivery for a full refund or exchange.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">7 Days</h3>
              <p className="text-gray-600">Return window from delivery date</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Free Returns</h3>
              <p className="text-gray-600">No return shipping charges</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Full Refund</h3>
              <p className="text-gray-600">100% money back guarantee</p>
            </div>
          </div>
        </div>

        {/* Return Conditions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Return Conditions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Eligible Returns */}
            <div>
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                <h3 className="text-xl font-bold text-green-800">Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Unopened products in original packaging</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Products with manufacturing defects</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Wrong items delivered</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Damaged during shipping</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Products not as described</span>
                </li>
              </ul>
            </div>

            {/* Non-Eligible Returns */}
            <div>
              <div className="flex items-center mb-4">
                <XCircle className="h-6 w-6 text-red-600 mr-2" />
                <h3 className="text-xl font-bold text-red-800">Not Eligible for Return</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Opened or used products</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Products without original packaging</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Returns after 7 days</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Products damaged by misuse</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                  <span className="text-gray-700">Custom or personalized items</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Return Process */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How to Return</h2>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contact Us</h3>
                <p className="text-gray-600 mb-2">
                  Call us at <strong>+880 1234-567890</strong> or email <strong>returns@malihasmiracle.com</strong> 
                  within 7 days of delivery.
                </p>
                <p className="text-sm text-gray-500">
                  Please have your order number ready for faster processing.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Get Return Authorization</h3>
                <p className="text-gray-600 mb-2">
                  Our team will review your request and provide a Return Authorization Number (RAN) 
                  along with return instructions.
                </p>
                <p className="text-sm text-gray-500">
                  This usually takes 2-4 hours during business hours.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pack & Ship</h3>
                <p className="text-gray-600 mb-2">
                  Pack the items securely in original packaging. Include the RAN number 
                  and use our prepaid return label.
                </p>
                <p className="text-sm text-gray-500">
                  We'll arrange pickup from your address at no extra cost.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 mt-1">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Refund Processing</h3>
                <p className="text-gray-600 mb-2">
                  Once we receive and inspect your return, we'll process your refund 
                  within 3-5 business days.
                </p>
                <p className="text-sm text-gray-500">
                  Refunds are issued to the original payment method.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Refund Information */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-6 text-center">Refund Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3">💳 Payment Methods</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Mobile Wallets: 1-2 business days</li>
                <li>• Bank Cards: 3-5 business days</li>
                <li>• Cash on Delivery: Bank transfer</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-3">📋 What's Refunded</h3>
              <ul className="space-y-2 text-blue-100">
                <li>• Full product price</li>
                <li>• Original shipping charges</li>
                <li>• Return shipping (free)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Exchange Policy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Exchange Policy</h2>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <p className="text-yellow-800 mb-4">
              <strong>Product Exchanges:</strong> We offer exchanges for the same product in different 
              sizes or variants, subject to availability.
            </p>
            <ul className="space-y-2 text-yellow-700">
              <li>• Same return conditions apply</li>
              <li>• No additional shipping charges</li>
              <li>• Exchange processed within 5-7 days</li>
              <li>• Price difference may apply for upgrades</li>
            </ul>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need help with a return?
          </h2>
          <p className="text-gray-600 mb-6">
            Our customer service team is ready to assist you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+8801234567890"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              📞 Call: +880 1234-567890
            </a>
            <a
              href="mailto:returns@malihasmiracle.com"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              ✉️ Email: returns@malihasmiracle.com
            </a>
          </div>
          
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">
              💚 <strong>Our Promise:</strong> We're committed to your satisfaction. 
              If you're not happy with your purchase, we'll make it right!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}