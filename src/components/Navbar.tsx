
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from '@/context/CartContext';
import { categories } from '@/data/products';

const Navbar: React.FC = () => {
  const { state } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-shop-purple">
            Demo-Ecom
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-shop-purple font-medium">
              Home
            </Link>
            <div className="relative group">
              <button className="text-gray-700 hover:text-shop-purple font-medium flex items-center">
                Categories
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-shop-light-purple hover:text-shop-purple"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/products" className="text-gray-700 hover:text-shop-purple font-medium">
              All Products
            </Link>
          </nav>
          
          {/* Action buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isSearchOpen ? (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 py-1 px-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-shop-purple"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-700 hover:text-shop-purple"
              >
                <Search size={20} />
              </button>
            )}
            <Link to="/account" className="text-gray-700 hover:text-shop-purple">
              <User size={20} />
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-shop-purple relative">
              <ShoppingCart size={20} />
              {state.totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-shop-purple text-white text-xs">
                  {state.totalItems}
                </Badge>
              )}
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link to="/cart" className="text-gray-700 hover:text-shop-purple relative">
              <ShoppingCart size={20} />
              {state.totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-shop-purple text-white text-xs">
                  {state.totalItems}
                </Badge>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-shop-purple"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden bg-white ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link 
            to="/" 
            className="block px-3 py-2 text-gray-700 hover:bg-shop-light-purple hover:text-shop-purple rounded-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <div>
            <button
              className="flex justify-between w-full px-3 py-2 text-gray-700 hover:bg-shop-light-purple hover:text-shop-purple rounded-md"
              onClick={(e) => {
                e.preventDefault();
                const categoriesEl = document.getElementById('mobile-categories');
                if (categoriesEl) {
                  categoriesEl.classList.toggle('hidden');
                }
              }}
            >
              <span>Categories</span>
            </button>
            <div id="mobile-categories" className="hidden pl-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="block px-3 py-2 text-gray-600 hover:bg-shop-light-purple hover:text-shop-purple rounded-md"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <Link 
            to="/products" 
            className="block px-3 py-2 text-gray-700 hover:bg-shop-light-purple hover:text-shop-purple rounded-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            All Products
          </Link>
          <Link 
            to="/account" 
            className="block px-3 py-2 text-gray-700 hover:bg-shop-light-purple hover:text-shop-purple rounded-md"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Account
          </Link>
          <div className="px-3 py-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-1 px-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-shop-purple"
              />
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
