import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <section className="pt-20 sm:pt-24 pb-16 bg-gradient-to-br from-primary-50 to-accent-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-500 leading-tight">
                Discover Stories That
                <span className="text-accent-500 font-serif italic"> Inspire</span>
              </h1>
              <p className="text-lg sm:text-xl text-secondary-500 leading-relaxed max-w-2xl">
                Dive into a world of captivating articles, expert insights, and thought-provoking content 
                that will expand your horizons and fuel your curiosity.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary-500 text-white px-8 py-4 rounded-xl hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold">
                <i className="bi bi-book-open mr-2"></i>
                Start Reading
              </button>
              <button className="border-2 border-primary-500 text-primary-500 px-8 py-4 rounded-xl hover:bg-primary-500 hover:text-white transition-all duration-300 font-semibold">
                <i className="bi bi-play-circle mr-2"></i>
                Watch Demo
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">500+</div>
                <div className="text-sm text-secondary-500">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">10K+</div>
                <div className="text-sm text-secondary-500">Readers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-500">50+</div>
                <div className="text-sm text-secondary-500">Authors</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=face"
                alt="Professional blogger writing"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                crossOrigin="anonymous"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
