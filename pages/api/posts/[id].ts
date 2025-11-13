import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Invalid post ID'
    });
  }

  switch (req.method) {
    case 'GET':
      try {
        const post = Database.getPostById(id);
        
        if (!post) {
          return res.status(404).json({
            success: false,
            error: 'Post not found'
          });
        }

        if (!post.published) {
          return res.status(404).json({
            success: false,
            error: 'Post not found'
          });
        }

        // Increment view count
        Database.incrementViews(id);

        res.status(200).json({
          success: true,
          data: post
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch post'
        });
      }
      break;

    case 'PUT':
      try {
        const updates = req.body;
        const updatedPost = Database.updatePost(id, updates);

        if (!updatedPost) {
          return res.status(404).json({
            success: false,
            error: 'Post not found'
          });
        }

        res.status(200).json({
          success: true,
          data: updatedPost
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to update post'
        });
      }
      break;

    case 'DELETE':
      try {
        const deleted = Database.deletePost(id);

        if (!deleted) {
          return res.status(404).json({
            success: false,
            error: 'Post not found'
          });
        }

        res.status(200).json({
          success: true,
          message: 'Post deleted successfully'
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to delete post'
        });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({
        success: false,
        error: `Method ${req.method} not allowed`
      });
  }
}
