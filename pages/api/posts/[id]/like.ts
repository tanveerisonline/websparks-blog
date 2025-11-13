import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '../../../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    });
  }

  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Invalid post ID'
    });
  }

  try {
    const post = Database.getPostById(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found'
      });
    }

    const newLikeCount = Database.toggleLike(id);

    res.status(200).json({
      success: true,
      data: {
        likes: newLikeCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to like post'
    });
  }
}
