import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import Newsletter from '../components/Newsletter';
import SearchBar from '../components/SearchBar';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  featured?: boolean;
  views: number;
  likes: number;
}

interface HomeProps {
  posts: BlogPost[];
  featuredPosts: BlogPost[];
}

const Home: React.FC<HomeProps> = ({ posts, featuredPosts }) => {
  return (
    <Layout>
      <Hero />
      
      <section className="py-16 bg-background-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-500 mb-4 font-serif">
              Search & Discover
            </h2>
            <p className="text-lg text-secondary-500 max-w-2xl mx-auto mb-8">
              Find exactly what you're looking for in our extensive collection of articles
            </p>
            <div className="max-w-md mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-500 mb-4 font-serif">
              Featured Stories
            </h2>
            <p className="text-lg text-secondary-500 max-w-2xl mx-auto">
              Discover our most popular and thought-provoking articles
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {featuredPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-500 mb-4 font-serif">
              Latest Articles
            </h2>
            <p className="text-lg text-secondary-500 max-w-2xl mx-auto">
              Stay updated with our newest content and insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-primary-500 text-white px-8 py-4 rounded-xl hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 font-semibold">
              <i className="bi bi-arrow-right mr-2"></i>
              View All Articles
            </button>
          </div>
        </div>
      </section>

      <Newsletter />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch featured posts
    const featuredResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/posts?featured=true&limit=3`);
    const featuredData = await featuredResponse.json();
    
    // Fetch regular posts
    const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/posts?limit=6`);
    const postsData = await postsResponse.json();

    return {
      props: {
        featuredPosts: featuredData.success ? featuredData.data : [],
        posts: postsData.success ? postsData.data.filter((post: BlogPost) => !post.featured) : [],
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return {
      props: {
        featuredPosts: [],
        posts: [],
      },
      revalidate: 60,
    };
  }
};

export default Home;
