import React, { useState } from 'react';
import { ShoppingCart, Heart, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onNavigate: (page: string, productId?: string) => void;
}

export default function ProductCard({ product, onNavigate }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedAnimation, setShowAddedAnimation] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    setIsFlying(true);
    
    setTimeout(() => {
      addToCart(product);
      setIsAddingToCart(false);
      setIsFlying(false);
      setShowAddedAnimation(true);
      
      setTimeout(() => {
        setShowAddedAnimation(false);
      }, 2000);
    }, 600);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    onNavigate('checkout');
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-2 left-2 z-20">
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discountPercentage}%
          </div>
        </div>
      )}

      {/* Product Badge */}
      {product.badge && (
        <div className="absolute top-2 right-2 z-20">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full shadow-lg ${
            product.badge === 'Best Seller' ? 'bg-green-100 text-green-800' :
            product.badge === 'New' ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }`}>
            {product.badge}
          </span>
        </div>
      )}

      {/* Product Image */}
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

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 
          className="font-semibold text-gray-900 mb-2 cursor-pointer hover:text-green-600 transition-colors"
          onClick={() => onNavigate('product', product.id)}
        >
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center mb-2">
          <span className="text-xl font-bold text-gray-900">৳{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">৳{product.originalPrice}</span>
          )}
        </div>
        
        {/* Stock Status */}
        <div className="mb-4">
          {product.inStock ? (
            <span className="text-sm text-green-600 font-medium">✓ In Stock</span>
          ) : (
            <span className="text-sm text-red-600 font-medium">✗ Out of Stock</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAddingToCart}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
        >
          {isAddingToCart ? (
            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          ) : showAddedAnimation ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </>
          )}
        </button>
      </div>

      {/* Enhanced Added to Cart Animation */}
      {showAddedAnimation && (
        <div className="absolute inset-0 bg-green-500/95 backdrop-blur-sm flex items-center justify-center rounded-xl z-30">
          <div className="text-white text-center">
            <div className="bg-white/20 rounded-full p-4 mb-3 mx-auto w-fit animate-bounce">
              <Check className="h-8 w-8" />
            </div>
            <p className="font-bold text-lg">Added to Cart!</p>
            <p className="text-sm opacity-90">Continue shopping</p>
          </div>
        </div>
      )}
    </div>
  );
}