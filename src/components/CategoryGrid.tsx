import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '../data/products';

interface CategoryGridProps {
  onNavigate: (page: string, category?: string) => void;
  onCategorySelect: (categoryId: string) => void;
  selectedCategory: string;
}

export default function CategoryGrid({ onNavigate, onCategorySelect, selectedCategory }: CategoryGridProps) {
  // Add "All" category at the beginning
  const allCategories = [
    { id: 'all', name: 'All', image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=300', productCount: 120 },
    ...categories.slice(0, 7) // Limit to 8 total categories including "All"
  ];

  return (
    <section className="py-8 lg:py-12 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our organic healthcare products
          </p>
        </div>

        {/* Categories Grid - Centered */}
        <div className="flex justify-center">
          <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 lg:gap-6 max-w-6xl">
            {allCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`group cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id ? 'scale-105' : ''
                }`}
              >
                <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl w-full ${
                  selectedCategory === category.id 
                    ? 'ring-3 ring-green-500 shadow-green-200' 
                    : 'hover:shadow-green-100'
                }`}>
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {selectedCategory === category.id && (
                      <div className="absolute inset-0 bg-green-500/20 backdrop-blur-[1px]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-2 sm:p-3 text-center">
                    <h3 className={`font-semibold text-xs sm:text-sm mb-1 transition-colors leading-tight ${
                      selectedCategory === category.id ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500">{category.productCount} items</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}