import React, { useState, useEffect } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Layout from '../../components/Layout';
import CommentSection from '../../components/CommentSection';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  tags: string[];
  views: number;
  likes: number;
}

interface BlogPostProps {
  post: BlogPost;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [liking, setLiking] = useState(false);

  const handleLike = async () => {
    if (liking || liked) return;
    
    setLiking(true);
    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: 'POST',
      });
      
      const data = await response.json();
      if (data.success) {
        setLikes(data.data.likes);
        setLiked(true);
      }
    } catch (error) {
      console.error('Failed to like post:', error);
    } finally {
      setLiking(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Layout title={post.title} description={post.excerpt}>
      <article className="pt-20 sm:pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-12">
            <div className="mb-6">
              <span className="bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-500 mb-6 leading-tight font-serif">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <i className="bi bi-person-fill text-primary-500 text-xl"></i>
                </div>
                <div>
                  <div className="font-semibold text-primary-500">{post.author}</div>
                  <div className="text-sm text-secondary-500">{formatDate(post.date)}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-secondary-500">
                <div className="flex items-center">
                  <i className="bi bi-clock mr-2"></i>
                  {post.readTime}
                </div>
                <div className="flex items-center">
                  <i className="bi bi-eye mr-2"></i>
                  {post.views} views
                </div>
                <button
                  onClick={handleLike}
                  disabled={liking || liked}
                  className={`flex items-center transition-colors duration-300 ${
                    liked 
                      ? 'text-red-500' 
                      : 'hover:text-red-500'
                  } disabled:opacity-50`}
                >
                  <i className={`bi ${liked ? 'bi-heart-fill' : 'bi-heart'} mr-2`}></i>
                  {likes}
                </button>
              </div>
            </div>
          </header>

          <div className="mb-12">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={800}
              height={400}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-lg"
              crossOrigin="anonymous"
            />
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            <div className="text-lg leading-relaxed text-secondary-600 space-y-6">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-primary-500 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm hover:bg-primary-200 transition-colors duration-300 cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mb-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-secondary-500 font-medium">Share this article:</span>
                <div className="flex space-x-3">
                  <button
                    onClick={() => sharePost('twitter')}
                    className="w-10 h-10 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300"
                  >
                    <i className="bi bi-twitter"></i>
                  </button>
                  <button
                    onClick={() => sharePost('facebook')}
                    className="w-10 h-10 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300"
                  >
                    <i className="bi bi-facebook"></i>
                  </button>
                  <button
                    onClick={() => sharePost('linkedin')}
                    className="w-10 h-10 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-300"
                  >
                    <i className="bi bi-linkedin"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <CommentSection postId={post.id} />
        </div>
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // In a real application, this would fetch all post IDs from your database
  const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } },
    { params: { id: '3' } },
  ];

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/posts/${id}`);
    
    if (!response.ok) {
      return {
        notFound: true,
      };
    }
    
    const data = await response.json();
    
    if (!data.success) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post: data.data,
      },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default BlogPost;
