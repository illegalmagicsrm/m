import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onSearch: (query: string) => void;
}

export default function Header({ onNavigate, currentPage, onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    { name: 'Categories', id: 'categories' },
    { name: 'About', id: 'about' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-green-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          <span>🌿 Free shipping on orders over ৳500 | 100% Organic Products</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Maliha's</h1>
              <p className="text-sm text-green-600 font-medium">Miracle</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium ${
                  currentPage === item.id ? 'text-green-600 border-b-2 border-green-600' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Cart Icon */}
          <button
            onClick={() => onNavigate('cart')}
            className="relative p-2 text-gray-700 hover:text-green-600 transition-colors duration-200"
          >
            <ShoppingCart className="h-6 w-6" />
            {cart.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-600"
              >
                <Search className="h-5 w-5" />
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
                className={`block w-full text-left py-2 px-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors ${
                  currentPage === item.id ? 'bg-green-50 text-green-600' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}