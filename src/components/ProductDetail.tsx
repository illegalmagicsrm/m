import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Star, Plus, Minus, Share2, Truck, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../contexts/CartContext';

interface ProductDetailProps {
  product: Product;
  onNavigate: (page: string) => void;
}

export default function ProductDetail({ product, onNavigate }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onNavigate('checkout');
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'usage', label: 'How to Use' }
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
            Back to Products
          </button>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Image Gallery */}
            <div>
              <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex space-x-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === selectedImage ? 'border-green-600' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Badge */}
              {product.badge && (
                <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${
                  product.badge === 'Best Seller' ? 'bg-green-100 text-green-800' :
                  product.badge === 'New' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {product.badge}
                </span>
              )}

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg text-gray-600 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center mb-6">
                <span className="text-4xl font-bold text-gray-900">৳{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through ml-3">৳{product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-red-100 text-red-800 text-sm font-semibold px-2 py-1 rounded ml-3">
                    Save ৳{product.originalPrice - product.price}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.inStock ? (
                  <span className="text-green-600 font-semibold flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    In Stock
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <span className="text-lg font-medium mr-4">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 text-lg font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                >
                  Buy Now
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="flex items-center space-x-4 mb-8">
                <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="h-5 w-5 mr-1" />
                  Add to Wishlist
                </button>
                <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                  <Share2 className="h-5 w-5 mr-1" />
                  Share
                </button>
              </div>

              {/* Delivery Info */}
              <div className="border-t pt-6">
                <div className="flex items-center mb-3">
                  <Truck className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">Free delivery on orders over ৳500</span>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-gray-700">7-day return policy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="border-t px-6 lg:px-8 pb-8">
            <div className="flex space-x-8 pt-6 border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 px-1 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="pt-6">
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              )}

              {activeTab === 'ingredients' && product.ingredients && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Key Ingredients:</h4>
                  <ul className="space-y-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'benefits' && product.benefits && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Benefits:</h4>
                  <ul className="space-y-2">
                    {product.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'usage' && product.usage && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">How to Use:</h4>
                  <ol className="space-y-2">
                    {product.usage.map((step, index) => (
                      <li key={index} className="flex text-gray-700">
                        <span className="bg-green-100 text-green-800 font-semibold w-6 h-6 rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}