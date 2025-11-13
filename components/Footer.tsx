import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center">
                <i className="bi bi-journal-text text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold font-serif">BlogCraft</span>
            </div>
            <p className="text-primary-100 leading-relaxed">
              Crafting exceptional stories and insights for the modern reader. Join our community of curious minds.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center hover:bg-accent-500 transition-colors duration-300">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center hover:bg-accent-500 transition-colors duration-300">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center hover:bg-accent-500 transition-colors duration-300">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center hover:bg-accent-500 transition-colors duration-300">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-primary-100 hover:text-accent-500 transition-colors duration-300">
                Home
              </Link>
              <Link href="/blog" className="block text-primary-100 hover:text-accent-500 transition-colors duration-300">
                Blog
              </Link>
              <Link href="/about" className="block text-primary-100 hover:text-accent-500 transition-colors duration-300">
                About
              </Link>
              <Link href="/contact" className="block text-primary-100 hover:text-accent-500 transition-colors duration-300">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="space-y-2">
              <Link href="/category/technology" className="block text-primary-100 hover:text-accent-500 transition-colors duration-300">
                Technology
              </Link>
              <Link href="/category/design" className="block text-primary-100 hover:text-accent-500 transition-colors duration-300">
                Design
              </Link>
              <Link href="/category/business" className="block text-primary-100 hover:text-accent-500 transition-colors duration-300">
                Business
              </Link>
              <Link href="/category/lifestyle" className="block text-primary-100 hover:text-accent-500 transition-colors duration-300">
                Lifestyle
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <i className="bi bi-envelope text-accent-500"></i>
                <span className="text-primary-100">hello@blogcraft.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="bi bi-telephone text-accent-500"></i>
                <span className="text-primary-100">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <i className="bi bi-geo-alt text-accent-500"></i>
                <span className="text-primary-100">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-400 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-primary-100 text-sm">
            © 2024 BlogCraft. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-primary-100 hover:text-accent-500 transition-colors duration-300 text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-primary-100 hover:text-accent-500 transition-colors duration-300 text-sm">
              Terms of Service
            </Link>
            <span className="text-primary-100 text-sm">
              Powered by <span className="text-accent-500 font-semibold">Websparks AI</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
