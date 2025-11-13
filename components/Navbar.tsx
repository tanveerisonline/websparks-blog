import React, { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <i className="bi bi-journal-text text-white text-lg"></i>
            </div>
            <span className="text-xl font-bold text-primary-500 font-serif">BlogCraft</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-primary-500 hover:text-accent-500 transition-colors duration-300 font-medium">
              Home
            </Link>
            <Link href="/blog" className="text-primary-500 hover:text-accent-500 transition-colors duration-300 font-medium">
              Blog
            </Link>
            <Link href="/about" className="text-primary-500 hover:text-accent-500 transition-colors duration-300 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-primary-500 hover:text-accent-500 transition-colors duration-300 font-medium">
              Contact
            </Link>
            <button className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-all duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            <i className={`bi ${isMenuOpen ? 'bi-x' : 'bi-list'} text-2xl text-primary-500`}></i>
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <Link href="/" className="block text-primary-500 hover:text-accent-500 transition-colors duration-300 font-medium py-2">
                Home
              </Link>
              <Link href="/blog" className="block text-primary-500 hover:text-accent-500 transition-colors duration-300 font-medium py-2">
                Blog
              </Link>
              <Link href="/about" className="block text-primary-500 hover:text-accent-500 transition-colors duration-300 font-medium py-2">
                About
              </Link>
              <Link href="/contact" className="block text-primary-500 hover:text-accent-500 transition-colors duration-300 font-medium py-2">
                Contact
              </Link>
              <button className="w-full bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-all duration-300 mt-4">
                Subscribe
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
