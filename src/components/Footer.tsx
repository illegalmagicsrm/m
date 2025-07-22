import React from 'react';
import { Leaf, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
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
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Products</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-gray-300">+880 1234-567890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-green-400 mr-2" />
                <span className="text-gray-300">info@malihasmiracle.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-green-400 mr-2 mt-1" />
                <span className="text-gray-300">
                  123 Organic Street<br />
                  Dhaka, Bangladesh
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Maliha's Miracle. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex space-x-2">
                <div className="bg-gray-800 px-2 py-1 rounded text-xs">bKash</div>
                <div className="bg-gray-800 px-2 py-1 rounded text-xs">Nagad</div>
                <div className="bg-gray-800 px-2 py-1 rounded text-xs">Card</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}