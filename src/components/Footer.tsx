import React from 'react';
import { Leaf, Facebook, Instagram, Twitter, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      // Save to localStorage for demo
      const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
      subscribers.push({ name, email, subscribedAt: new Date().toISOString() });
      localStorage.setItem('subscribers', JSON.stringify(subscribers));
      
      console.log('New subscriber:', { name, email });
      setSubscribed(true);
      setName('');
      setEmail('');
      
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-green-600 p-2 rounded-full mr-3">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Maliha's</h1>
                <p className="text-sm text-green-400 font-medium">Miracle</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted source for organic healthcare products. We believe in the power of nature to heal and nourish.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-green-400 transition-colors">Products</a></li>
              <li><a href="/offers" className="text-gray-300 hover:text-green-400 transition-colors">Offers</a></li>
              <li><a href="/shipping" className="text-gray-300 hover:text-green-400 transition-colors">Shipping Info</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-green-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="/faq" className="text-gray-300 hover:text-green-400 transition-colors">Help Center</a></li>
              <li><a href="/shipping" className="text-gray-300 hover:text-green-400 transition-colors">Shipping Info</a></li>
              <li><a href="/returns" className="text-gray-300 hover:text-green-400 transition-colors">Returns & Exchanges</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-green-400 transition-colors">Track Order</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-green-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4 text-sm">
              Subscribe to get special offers, health tips, and new product updates!
            </p>
            
            {subscribed ? (
              <div className="bg-green-600 text-white p-4 rounded-lg text-center">
                <p className="font-semibold">Thanks for subscribing! 🎉</p>
                <p className="text-sm">We'll keep you updated with our latest offers.</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Maliha's Miracle. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0 text-gray-400 text-sm">
              <a href="/contact" className="hover:text-green-400 transition-colors">Contact</a>
              <span>•</span>
              <a href="/shipping" className="hover:text-green-400 transition-colors">Shipping</a>
              <span>•</span>
              <a href="/returns" className="hover:text-green-400 transition-colors">Returns</a>
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex space-x-2">
                <div className="bg-gray-800 px-3 py-1 rounded-lg text-xs font-medium">bKash</div>
                <div className="bg-gray-800 px-3 py-1 rounded-lg text-xs font-medium">Nagad</div>
                <div className="bg-gray-800 px-3 py-1 rounded-lg text-xs font-medium">Cards</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}