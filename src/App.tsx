import React, { useState } from 'react';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategoryGrid from './components/CategoryGrid';
import HorizontalProductSlider from './components/HorizontalProductSlider';
import ComboOfferSection from './components/ComboOfferSection';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import SearchResults from './components/SearchResults';
import Footer from './components/Footer';
import { products, categories } from './data/products';
import { Product } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const handleNavigation = (page: string, param?: string) => {
    setCurrentPage(page);
    
    if (page === 'product' && param) {
      const product = products.find(p => p.id === param);
      setSelectedProduct(product || null);
    } else if (page === 'products' && param) {
      setSelectedCategory(param);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const results = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  const getFilteredProducts = () => {
    if (selectedCategory) {
      return products.filter(product => product.category === selectedCategory);
    }
    return products;
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'All Products';
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'product':
        if (!selectedProduct) return <div>Product not found</div>;
        return <ProductDetail product={selectedProduct} onNavigate={handleNavigation} />;
      
      case 'cart':
        return <Cart onNavigate={handleNavigation} />;
      
      case 'checkout':
        return <Checkout onNavigate={handleNavigation} />;
      
      case 'search':
        return (
          <SearchResults 
            query={searchQuery} 
            results={searchResults} 
            onNavigate={handleNavigation} 
          />
        );
      
      case 'products':
      case 'categories':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="bg-white py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 text-center">
                  {selectedCategory ? 
                    `${getCategoryName(selectedCategory)} Products` : 
                    'All Products'}
                </h1>
              </div>
            </div>
            <HorizontalProductSlider 
              products={getFilteredProducts()} 
              title=""
              onNavigate={handleNavigation} 
            />
          </div>
        );
      
      case 'about':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">About Maliha's Miracle</h1>
                <div className="prose max-w-none">
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Welcome to Maliha's Miracle, your trusted partner in natural wellness and organic beauty. 
                    We believe that nature holds the key to healthy, radiant living, and our mission is to 
                    bring you the finest organic healthcare products that nurture your body and soul.
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Founded with a passion for natural healing, Maliha's Miracle specializes in carefully 
                    crafted organic products including hair oils, hair masks, hair tonics, lip balms, and soaps. 
                    Each product is made with love, using traditional recipes combined with modern quality standards.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-green-800 mb-3">Our Promise</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• 100% Organic Ingredients</li>
                        <li>• No Harmful Chemicals</li>
                        <li>• Cruelty-Free Products</li>
                        <li>• Sustainable Packaging</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-blue-800 mb-3">Why Choose Us</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Expert Formulations</li>
                        <li>• Quality Assurance</li>
                        <li>• Fast Delivery</li>
                        <li>• Customer Support</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div>
            <HeroSection onNavigate={handleNavigation} />
            <CategoryGrid 
              onNavigate={handleNavigation} 
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
            
            {/* Category-based Product Slider */}
            {selectedCategory && (
              <HorizontalProductSlider 
                products={products.filter(p => p.category === selectedCategory).slice(0, 15)} 
                title={`${getCategoryName(selectedCategory)} Products`}
                onNavigate={handleNavigation} 
                bgColor="bg-white"
              />
            )}
            
            {/* Combo Offers Section */}
            <ComboOfferSection onNavigate={handleNavigation} />
            
            <div className="space-y-4">
              <HorizontalProductSlider 
                products={products.filter(p => p.badge === 'Best Seller').slice(0, 15)} 
                title="Best Selling Products" 
                onNavigate={handleNavigation} 
                bgColor="bg-gray-50"
              />
              
              <HorizontalProductSlider 
                products={products.filter(p => p.badge === 'New').slice(0, 15)} 
                title="New Arrivals" 
                onNavigate={handleNavigation} 
                bgColor="bg-green-50"
              />
              
              <HorizontalProductSlider 
                products={products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 15)} 
                title="Special Offers" 
                onNavigate={handleNavigation} 
                bgColor="bg-blue-50"
              />
            </div>
          </div>
        );
    }
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
          onNavigate={handleNavigation} 
          currentPage={currentPage} 
          onSearch={handleSearch}
        />
        <main>
          {renderPage()}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;