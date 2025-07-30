import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Leaf, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import CartPanel from './CartPanel';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onSearch: (query: string) => void;
}

export default function Header({ onNavigate, currentPage, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      onNavigate('search');
    }
  };

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Products', id: 'products' },
    { name: 'Offers', id: 'offers' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm font-medium">
            <span className="hidden sm:inline">🌿 Free shipping on orders over ৳1200 | 100% Organic Products | Cash on Delivery Available</span>
            <span className="sm:hidden">🌿 Free shipping over ৳1200</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => onNavigate('home')}>
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-2 rounded-xl mr-3 shadow-sm">
                <Leaf className="h-6 w-6 lg:h-8 lg:w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight">Maliha's</h1>
                <p className="text-xs lg:text-sm text-green-600 font-semibold -mt-1">Miracle</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-gray-700 hover:text-green-600 transition-all duration-200 font-medium px-3 py-2 rounded-lg hover:bg-green-50 ${
                    currentPage === item.id ? 'text-green-600 bg-green-50' : ''
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Modern Search Bar */}
            <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md mx-4 lg:mx-8">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Search for organic products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 lg:py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 text-gray-700 placeholder-gray-400 text-sm"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  </div>
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white p-1.5 lg:p-2 rounded-lg transition-all duration-200 hover:scale-105"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Cart Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 lg:p-3 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200 group"
              >
                <ShoppingCart className="h-5 w-5 lg:h-6 lg:w-6 group-hover:scale-110 transition-transform" />
                {cart.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 lg:h-6 lg:w-6 flex items-center justify-center font-bold animate-bounce">
                    {cart.itemCount > 99 ? '99+' : cart.itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden px-4 pb-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search organic products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-300 text-gray-700 placeholder-gray-400 text-sm"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-1.5 rounded-lg"
                >
                  <Search className="h-3 w-3" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden bg-white border-t border-gray-100 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-3 px-4 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 font-medium ${
                  currentPage === item.id ? 'bg-green-50 text-green-600' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Cart Panel */}
      <CartPanel 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onNavigate={onNavigate}
      />
    </>
  );
}
            >
              <ShoppingCart className="h-6 w-6" />
              {cart.itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse">
                  {cart.itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-green-600"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white p-2 rounded-xl"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 px-4 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors ${
                    currentPage === item.id ? 'bg-green-50 text-green-600 font-medium' : ''
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Cart Panel */}
      <CartPanel 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onNavigate={onNavigate}
      />
    </>
  );
}