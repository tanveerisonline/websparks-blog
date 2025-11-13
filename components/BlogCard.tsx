import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  author,
  date,
  readTime,
  category,
  imageUrl,
  featured = false
}) => {
  return (
    <article className={`group cursor-pointer ${featured ? 'lg:col-span-2' : ''}`}>
      <Link href={`/blog/${id}`}>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
          <div className="relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              width={featured ? 800 : 400}
              height={featured ? 400 : 250}
              className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
              crossOrigin="anonymous"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {category}
              </span>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <h3 className={`font-bold text-primary-500 group-hover:text-accent-500 transition-colors duration-300 line-clamp-2 ${featured ? 'text-2xl' : 'text-xl'}`}>
              {title}
            </h3>
            
            <p className="text-secondary-500 leading-relaxed line-clamp-3">
              {excerpt}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <i className="bi bi-person-fill text-primary-500"></i>
                </div>
                <div>
                  <div className="text-sm font-medium text-primary-500">{author}</div>
                  <div className="text-xs text-secondary-500">{date}</div>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-secondary-500">
                <i className="bi bi-clock mr-1"></i>
                {readTime}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
