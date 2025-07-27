import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

interface ComboOfferSectionProps {
  onNavigate: (page: string, productId?: string) => void;
}

export default function ComboOfferSection({ onNavigate }: ComboOfferSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get combo offer products (products with original price - indicating discount)
  const comboProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 10);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280; // Width of card + gap
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (comboProducts.length === 0) return null;

  return (
    <section className="py-8 bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full mr-4">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Combo Offers
              </h2>
              <p className="text-gray-600">Special deals and discounts</p>
            </div>
          </div>
        </div>

        {/* Horizontal Product Slider with Side Arrows */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-purple-600 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            style={{ marginLeft: '-20px' }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-purple-600 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
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
            {comboProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0">
                <ProductCard product={product} onNavigate={onNavigate} />
              </div>
            ))}
          </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}