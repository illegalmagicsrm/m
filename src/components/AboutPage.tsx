import React from 'react';
import { ArrowLeft, Leaf, Heart, Shield, Award, Users, Globe } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const values = [
    {
      icon: Leaf,
      title: "100% Organic",
      description: "All our products are made with certified organic ingredients, free from harmful chemicals and synthetic additives."
    },
    {
      icon: Heart,
      title: "Made with Love",
      description: "Each product is carefully crafted with passion and dedication to bring you the best natural healthcare solutions."
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "We maintain the highest quality standards through rigorous testing and quality control processes."
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Our commitment to excellence has been recognized with multiple awards in the organic healthcare industry."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Customers" },
    { number: "120+", label: "Organic Products" },
    { number: "5+", label: "Years Experience" },
    { number: "64", label: "Districts Served" }
  ];

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
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <Leaf className="h-16 w-16" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Maliha's Miracle
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
            Your trusted partner in natural wellness and organic beauty since 2019
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>
            <div className="prose prose-lg text-gray-700">
              <p className="mb-4">
                Maliha's Miracle was born from a simple belief: nature holds the key to healthy, 
                radiant living. Founded in 2019 by Maliha Rahman, our journey began when she 
                struggled to find truly organic, chemical-free products for her family's healthcare needs.
              </p>
              <p className="mb-4">
                What started as a personal quest for natural wellness solutions has grown into 
                Bangladesh's most trusted organic healthcare brand. We specialize in carefully 
                crafted products including hair oils, skin care, organic soaps, lip care, and 
                essential oils.
              </p>
              <p>
                Every product is made with love, using traditional recipes combined with modern 
                quality standards. We source our ingredients from certified organic farms and 
                ensure that every item meets our strict quality criteria.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Organic ingredients"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-2xl">
              <div className="text-center">
                <div className="text-3xl font-bold">5+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape our commitment to you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
                >
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-green-100">
              Numbers that reflect our commitment to excellence
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-green-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img
              src="https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Our mission"
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <div className="prose prose-lg text-gray-700">
              <p className="mb-4">
                To make organic, natural healthcare products accessible to every family in Bangladesh. 
                We believe everyone deserves the right to healthy, chemical-free products that nourish 
                both body and soul.
              </p>
              <p className="mb-6">
                Our mission extends beyond just selling products – we're committed to educating our 
                customers about the benefits of organic living and supporting sustainable farming 
                practices across Bangladesh.
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-green-800 mb-3">Our Promise</h3>
              <ul className="space-y-2 text-green-700">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  100% Organic Ingredients
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  No Harmful Chemicals
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Cruelty-Free Products
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Sustainable Packaging
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Have questions about our products or want to learn more about organic living?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+8801234567890"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center"
            >
              <span>📞 Call Us: +880 1234-567890</span>
            </a>
            <a
              href="mailto:info@malihasmiracle.com"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors flex items-center justify-center"
            >
              <span>✉️ Email: info@malihasmiracle.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}