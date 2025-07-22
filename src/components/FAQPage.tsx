import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';

interface FAQPageProps {
  onNavigate: (page: string) => void;
}

const faqs = [
  {
    id: 1,
    category: "Products",
    question: "Are your products 100% organic?",
    answer: "Yes, all our products are made with 100% organic ingredients. We source our raw materials from certified organic farms and ensure no harmful chemicals or synthetic additives are used in our manufacturing process. Each product undergoes rigorous quality testing to maintain our organic standards."
  },
  {
    id: 2,
    category: "Shipping",
    question: "How long does shipping take?",
    answer: "We offer fast delivery across Bangladesh. Orders are typically processed within 24 hours and delivered within 2-5 business days depending on your location. Dhaka and major cities receive faster delivery (1-2 days), while remote areas may take up to 5 business days."
  },
  {
    id: 3,
    category: "Payment",
    question: "Do you offer cash on delivery?",
    answer: "Yes, we offer cash on delivery (COD) service across Bangladesh. You can pay when you receive your order. We also accept online payments through bKash, Nagad, Rocket, and credit/debit cards through our secure payment gateway."
  },
  {
    id: 4,
    category: "Returns",
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy for unopened products. If you're not satisfied with your purchase, you can return it within 7 days of delivery for a full refund or exchange. The product must be in its original packaging and unused condition."
  },
  {
    id: 5,
    category: "Products",
    question: "Are your products suitable for sensitive skin?",
    answer: "Most of our products are formulated to be gentle and suitable for sensitive skin. However, we recommend doing a patch test before using any new product. Check the ingredient list and consult with a dermatologist if you have specific skin concerns or allergies."
  },
  {
    id: 6,
    category: "Storage",
    question: "How should I store the products?",
    answer: "Store our organic products in a cool, dry place away from direct sunlight. Some products like oils and serums should be kept in the refrigerator for extended shelf life. Always check the product label for specific storage instructions and expiry dates."
  },
  {
    id: 7,
    category: "Shipping",
    question: "Do you offer free shipping?",
    answer: "Yes, we offer free shipping on orders over ৳500 anywhere in Bangladesh. For orders below ৳500, standard shipping charges apply: ৳40 for Rajshahi district and ৳120 for all other districts."
  },
  {
    id: 8,
    category: "Products",
    question: "Can I use multiple products together?",
    answer: "Yes, our products are designed to work well together. However, when introducing new products to your routine, we recommend starting with one product at a time to see how your skin reacts. You can gradually add more products to your routine."
  },
  {
    id: 9,
    category: "Orders",
    question: "Can I modify or cancel my order?",
    answer: "You can modify or cancel your order within 2 hours of placing it. After that, the order goes into processing and cannot be changed. Please contact our customer service immediately if you need to make changes."
  },
  {
    id: 10,
    category: "Ingredients",
    question: "Do you test on animals?",
    answer: "No, we are completely cruelty-free. We do not test our products on animals at any stage of product development. We believe in ethical beauty and use alternative testing methods to ensure product safety and effectiveness."
  }
];

export default function FAQPage({ onNavigate }: FAQPageProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

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
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 p-4 rounded-full">
              <HelpCircle className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">
            Find answers to common questions about our organic products
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:bg-white/20 focus:border-white/40 focus:ring-4 focus:ring-white/10 transition-all duration-300 text-white placeholder-white/70"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/70" />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openFAQ === faq.id ? (
                      <ChevronUp className="h-6 w-6 text-blue-600 transform transition-transform duration-200" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 transform transition-transform duration-200" />
                    )}
                  </div>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFAQ === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or category filter
              </p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Still have questions?
            </h2>
            <p className="text-xl mb-6 text-green-100">
              We're here to help! Contact our customer support team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+8801234567890"
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm"
              >
                📞 Call Us: +880 1234-567890
              </a>
              <a
                href="mailto:info@malihasmiracle.com"
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-colors backdrop-blur-sm"
              >
                ✉️ Email: info@malihasmiracle.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}