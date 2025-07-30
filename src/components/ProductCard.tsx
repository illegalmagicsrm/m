import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Check, Sparkles } from 'lucide-react';
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
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 h-full flex flex-col">
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 z-20">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
            -{discountPercentage}%
          </div>
        </div>
      )}

      {/* Product Badge */}
      {product.badge && (
        <div className="absolute top-3 right-3 z-20">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full shadow-lg ${
            product.badge === 'Best Seller' ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' :
            product.badge === 'New' ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white' :
            'bg-gradient-to-r from-orange-400 to-orange-600 text-white'
          }`}>
            {product.badge}
          </span>
        </div>
      )}

      {/* Wishlist Button */}
      <button className="absolute top-12 right-3 z-20 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110">
        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
      </button>

      {/* Product Image */}
      <div 
        className="relative aspect-square overflow-hidden cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0"
        onClick={() => onNavigate('product', product.id)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Flying Animation */}
        {isFlying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-ping bg-green-500 rounded-full p-3">
              <ShoppingCart className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3 flex-1 flex flex-col">
        {/* Product Name */}
        <h3 
          className="font-semibold text-gray-900 text-sm leading-tight cursor-pointer hover:text-green-600 transition-colors line-clamp-2 min-h-[2.5rem] flex items-start"
          onClick={() => onNavigate('product', product.id)}
        >
          {product.name}
        </h3>

        {/* Stock Status */}
        <div className="flex items-center justify-center">
          {product.inStock ? (
            <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5 animate-pulse" />
              <span className="text-xs font-medium whitespace-nowrap">In Stock</span>
            </div>
          ) : (
            <div className="flex items-center text-red-600 bg-red-50 px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-1.5" />
              <span className="text-xs font-medium whitespace-nowrap">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-lg font-bold text-gray-900">৳{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">৳{product.originalPrice}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2 mt-auto">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAddingToCart}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-2.5 px-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-2"
          >
            {isAddingToCart ? (
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
            ) : showAddedAnimation ? (
              <>
                <Check className="h-4 w-4" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
          
          <button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-2.5 px-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>Buy Now</span>
          </button>
        </div>
      </div>

      {/* Enhanced Added to Cart Animation */}
      {showAddedAnimation && (
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/95 to-emerald-600/95 backdrop-blur-sm flex items-center justify-center rounded-2xl z-30">
          <div className="text-white text-center">
            <div className="bg-white/20 rounded-full p-4 mb-3 mx-auto w-fit animate-bounce">
              <Check className="h-8 w-8" />
            </div>
            <p className="font-bold text-lg">Added to Cart!</p>
            <p className="text-sm opacity-90">Continue shopping</p>
          </div>
        </div>
      )}

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </div>
  );
}