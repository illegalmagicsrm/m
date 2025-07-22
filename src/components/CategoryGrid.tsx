import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '../data/products';

interface CategoryGridProps {
  onNavigate: (page: string, category?: string) => void;
  onCategorySelect: (categoryId: string) => void;
  selectedCategory: string;
}

export default function CategoryGrid({ onNavigate, onCategorySelect, selectedCategory }: CategoryGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Add "All" category at the beginning
  const allCategories = [
    { id: 'all', name: 'All', image: 'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=300', productCount: 120 },
    ...categories
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Check if we need scroll arrows (more than what fits in 80vw)
  const needsScroll = allCategories.length > 6; // Approximate for responsive design

  return (
    <section className="py-8 bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-600">
            Discover our organic healthcare products
          </p>
        </div>

        {/* Category Slider */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-green-600 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            style={{ marginLeft: '-20px' }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-green-600 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            style={{ marginRight: '-20px' }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Scrollable Categories Container - 80vw width */}
          <div className="w-[80vw] mx-auto">
            <div
              ref={scrollRef}
              className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2 px-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {allCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => onCategorySelect(category.id)}
                  className={`group cursor-pointer flex-shrink-0 transform transition-all duration-300 hover:scale-105 ${
                    selectedCategory === category.id ? 'scale-105' : ''
                  }`}
                >
                  <div className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl w-24 md:w-32 ${
                    selectedCategory === category.id 
                      ? 'ring-2 ring-green-500 shadow-green-200' 
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
                    </div>
                    <div className="p-2 md:p-3 text-center">
                      <h3 className={`font-semibold text-xs md:text-sm mb-1 transition-colors ${
                        selectedCategory === category.id ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-600">{category.productCount} items</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}