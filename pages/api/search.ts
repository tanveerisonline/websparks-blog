import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} not allowed`
    });
  }

  try {
    const { q, limit } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    let results = Database.searchPosts(q);

    // Limit results
    if (limit && typeof limit === 'string') {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum)) {
        results = results.slice(0, limitNum);
      }
    }

    res.status(200).json({
      success: true,
      data: results,
      total: results.length,
      query: q
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Search failed'
    });
  }
}
