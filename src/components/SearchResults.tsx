import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ProductGrid from './ProductGrid';
import { Product } from '../types';

interface SearchResultsProps {
  query: string;
  results: Product[];
  onNavigate: (page: string, productId?: string) => void;
}

export default function SearchResults({ query, results, onNavigate }: SearchResultsProps) {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600 mt-2">
            {results.length} product{results.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <div key={product.id}>
                {/* We'll need to import ProductCard component here, but for now inline */}
                <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                  <div 
                    className="aspect-square overflow-hidden cursor-pointer"
                    onClick={() => onNavigate('product', product.id)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 
                      className="font-semibold text-gray-900 mb-2 cursor-pointer hover:text-green-600 transition-colors"
                      onClick={() => onNavigate('product', product.id)}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <span className="text-xl font-bold text-gray-900">৳{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through ml-2">৳{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="mb-4">
                      {product.inStock ? (
                        <span className="text-sm text-green-600 font-medium">✓ In Stock</span>
                      ) : (
                        <span className="text-sm text-red-600 font-medium">✗ Out of Stock</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse our categories
            </p>
            <button
              onClick={() => onNavigate('home')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}