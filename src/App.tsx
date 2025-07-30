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
import ProductsPage from './components/ProductsPage';
import OffersPage from './components/OffersPage';
import AboutPage from './components/AboutPage';
import ShippingPage from './components/ShippingPage';
import ReturnPolicyPage from './components/ReturnPolicyPage';
import ContactPage from './components/ContactPage';
import ThankYouPage from './components/ThankYouPage';
import FAQPage from './components/FAQPage';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import { products, categories } from './data/products';
import { Product } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
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
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  };

  const getCategoryName = (categoryId: string) => {
    if (categoryId === 'all') return 'All Products';
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
        return <ProductsPage onNavigate={handleNavigation} />;
      
      case 'offers':
        return <OffersPage onNavigate={handleNavigation} />;
      
      case 'about':
        return <AboutPage onNavigate={handleNavigation} />;
      
      case 'shipping':
        return <ShippingPage onNavigate={handleNavigation} />;
      
      case 'returns':
        return <ReturnPolicyPage onNavigate={handleNavigation} />;
      
      case 'contact':
        return <ContactPage onNavigate={handleNavigation} />;
      
      case 'thank-you':
        return <ThankYouPage onNavigate={handleNavigation} />;
      
      case 'faq':
        return <FAQPage onNavigate={handleNavigation} />;
      
      default:
        return (
          <div>
            <HeroSection onNavigate={handleNavigation} />
            <CategoryGrid 
              onNavigate={handleNavigation} 
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
            
            {/* Selected Category Products */}
            <HorizontalProductSlider 
              products={getFilteredProducts().slice(0, 20)} 
              title={getCategoryName(selectedCategory)}
              onNavigate={handleNavigation} 
              bgColor="bg-white"
            />
            
            {/* Combo Offers Section */}
            <ComboOfferSection onNavigate={handleNavigation} />
            
            {/* Best Selling Products */}
            <HorizontalProductSlider 
              products={products.filter(p => p.badge === 'Best Seller').slice(0, 20)} 
              title="Best Selling Products" 
              onNavigate={handleNavigation} 
              bgColor="bg-gray-50"
            />
            
            {/* FAQ Section */}
            <FAQSection />
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