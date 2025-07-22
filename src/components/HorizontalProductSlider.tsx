import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface HorizontalProductSliderProps {
  products: Product[];
  title: string;
  onNavigate: (page: string, productId?: string) => void;
  bgColor?: string;
}

export default function HorizontalProductSlider({ 
  products, 
  title, 
  onNavigate, 
  bgColor = 'bg-white' 
}: HorizontalProductSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200; // Width of card + gap for mobile
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className={`py-8 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {title}
          </h2>
        </div>

        {/* Horizontal Product Slider with Side Arrows */}
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
          {/* Products Container */}
          <div
            ref={scrollRef}
            className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2 px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0">
                <ProductCard product={product} onNavigate={onNavigate} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}