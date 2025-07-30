import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "Are your products 100% organic?",
    answer: "Yes, all our products are made with 100% organic ingredients. We source our raw materials from certified organic farms and ensure no harmful chemicals or synthetic additives are used in our manufacturing process."
  },
  {
    id: 2,
    question: "How long does shipping take?",
    answer: "We offer fast delivery across Bangladesh. Orders are typically processed within 24 hours and delivered within 2-5 business days depending on your location. Dhaka and major cities receive faster delivery."
  },
  {
    id: 3,
    question: "Do you offer cash on delivery?",
    answer: "Yes, we offer cash on delivery (COD) service across Bangladesh. You can pay when you receive your order. We also accept online payments through bKash, Nagad, Rocket, and credit/debit cards."
  },
  {
    id: 4,
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy for unopened products. If you're not satisfied with your purchase, you can return it within 7 days of delivery for a full refund or exchange."
  },
  {
    id: 5,
    question: "Are your products suitable for sensitive skin?",
    answer: "Most of our products are formulated to be gentle and suitable for sensitive skin. However, we recommend doing a patch test before using any new product. Check the ingredient list and consult with a dermatologist if you have specific concerns."
  },
  {
    id: 6,
    question: "How should I store the products?",
    answer: "Store our organic products in a cool, dry place away from direct sunlight. Some products like oils and serums should be kept in the refrigerator for extended shelf life. Always check the product label for specific storage instructions."
  }
];

export default function FAQSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-full">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our organic products
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-300"
              >
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 pr-4 leading-relaxed">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openFAQ === faq.id ? (
                    <ChevronUp className="h-5 w-5 lg:h-6 lg:w-6 text-blue-600 transform transition-all duration-300 rotate-180" />
                  ) : (
                    <ChevronDown className="h-5 w-5 lg:h-6 lg:w-6 text-gray-400 transform transition-all duration-300" />
                  )}
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQ === faq.id ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'
                }`}
              >
                <div className="px-6">
                  <div className="border-t border-gray-100 pt-5">
                    <p className="text-gray-700 leading-relaxed text-sm lg:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+8801234567890"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Call Us: +880 1234-567890
            </a>
            <a
              href="mailto:info@malihasmiracle.com"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Email: info@malihasmiracle.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}