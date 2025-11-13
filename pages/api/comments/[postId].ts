import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { postId } = req.query;

  if (!postId || typeof postId !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Invalid post ID'
    });
  }

  switch (req.method) {
    case 'GET':
      try {
        const comments = Database.getCommentsByPostId(postId);
        
        res.status(200).json({
          success: true,
          data: comments
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to fetch comments'
        });
      }
      break;

    case 'POST':
      try {
        const { author, email, content } = req.body;

        if (!author || !email || !content) {
          return res.status(400).json({
            success: false,
            error: 'Missing required fields'
          });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            success: false,
            error: 'Invalid email format'
          });
        }

        const newComment = Database.createComment({
          postId,
          author,
          email,
          content
        });

        res.status(201).json({
          success: true,
          data: newComment,
          message: 'Comment submitted for approval'
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to create comment'
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
