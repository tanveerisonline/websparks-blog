import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Initialize sample data on first run
  Database.initializeSampleData();

  switch (req.method) {
    case 'GET':
      try {
        const { featured, category, limit, search } = req.query;
        let posts = Database.getPublishedPosts();

        // Filter by search query
        if (search && typeof search === 'string') {
          posts = Database.searchPosts(search);
        }

        // Filter by featured
        if (featured === 'true') {
          posts = posts.filter(post => post.featured);
        }

        // Filter by category
        if (category && typeof category === 'string') {
          posts = posts.filter(post => post.category.toLowerCase() === category.toLowerCase());
        }

        // Sort by date (newest first)
        posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // Limit results
        if (limit && typeof limit === 'string') {
          const limitNum = parseInt(limit, 10);
          if (!isNaN(limitNum)) {
            posts = posts.slice(0, limitNum);
          }
        }

        res.status(200).json({
          success: true,
          data: posts,
          total: posts.length
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch posts'
        });
      }
      break;

    case 'POST':
      try {
        const { title, content, excerpt, author, category, imageUrl, featured, tags } = req.body;

        if (!title || !content || !excerpt || !author || !category) {
          return res.status(400).json({
            success: false,
            error: 'Missing required fields'
          });
        }

        const newPost = Database.createPost({
          title,
          content,
          excerpt,
          author,
          category,
          imageUrl: imageUrl || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
          featured: featured || false,
          published: true,
          tags: tags || [],
          readTime: `${Math.ceil(content.split(' ').length / 200)} min read`
        });

        res.status(201).json({
          success: true,
          data: newPost
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to create post'
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({
        success: false,
        error: `Method ${req.method} not allowed`
      });
  }
}
