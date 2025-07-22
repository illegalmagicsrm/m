import React from 'react';
import { ArrowLeft, Gift, Clock, Star } from 'lucide-react';

interface OffersPageProps {
  onNavigate: (page: string) => void;
}

const offers = [
  {
    id: 1,
    title: "50% Off Hair Care Collection",
    description: "Get amazing discounts on our premium organic hair care products. Limited time offer!",
    image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600",
    discount: "50% OFF",
    validUntil: "Dec 31, 2024",
    code: "HAIR50"
  },
  {
    id: 2,
    title: "Buy 2 Get 1 Free - Skin Care",
    description: "Purchase any 2 skin care products and get the 3rd one absolutely free. Mix and match available!",
    image: "https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=600",
    discount: "Buy 2 Get 1",
    validUntil: "Jan 15, 2025",
    code: "SKIN3FOR2"
  },
  {
    id: 3,
    title: "New Customer Special",
    description: "First-time customers get 30% off on their entire order. Welcome to Maliha's Miracle!",
    image: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=600",
    discount: "30% OFF",
    validUntil: "Ongoing",
    code: "WELCOME30"
  },
  {
    id: 4,
    title: "Organic Soap Bundle Deal",
    description: "Get 5 handcrafted organic soaps for the price of 3. Perfect for gifting or personal use!",
    image: "https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=600",
    discount: "5 for 3",
    validUntil: "Dec 25, 2024",
    code: "SOAP5FOR3"
  },
  {
    id: 5,
    title: "Free Shipping Weekend",
    description: "Enjoy free shipping on all orders this weekend. No minimum purchase required!",
    image: "https://images.pexels.com/photos/4202662/pexels-photo-4202662.jpeg?auto=compress&cs=tinysrgb&w=600",
    discount: "Free Shipping",
    validUntil: "This Weekend",
    code: "FREESHIP"
  },
  {
    id: 6,
    title: "Essential Oils Mega Sale",
    description: "Up to 40% off on all essential oils. Stock up on your favorites and discover new scents!",
    image: "https://images.pexels.com/photos/4465309/pexels-photo-4465309.jpeg?auto=compress&cs=tinysrgb&w=600",
    discount: "Up to 40% OFF",
    validUntil: "Jan 10, 2025",
    code: "OILS40"
  }
];

export default function OffersPage({ onNavigate }: OffersPageProps) {
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
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <Gift className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Special Offers
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-8">
            Amazing deals on organic healthcare products
          </p>
          <div className="flex items-center justify-center space-x-2 text-purple-100">
            <Star className="h-5 w-5 fill-current" />
            <span>Limited time offers</span>
            <Star className="h-5 w-5 fill-current" />
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Offer Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {offer.discount}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                    <Clock className="h-4 w-4 text-orange-500 mr-1" />
                    <span className="text-xs font-medium text-gray-700">{offer.validUntil}</span>
                  </div>
                </div>
              </div>

              {/* Offer Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {offer.description}
                </p>
                
                {/* Promo Code */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Promo Code:</span>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {offer.code}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => onNavigate('products')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Don't Miss Out!
            </h2>
            <p className="text-xl mb-6 text-green-100">
              Subscribe to our newsletter and be the first to know about new offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}