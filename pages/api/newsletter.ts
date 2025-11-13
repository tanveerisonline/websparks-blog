import { NextApiRequest, NextApiResponse } from 'next';
import { Database } from '../../lib/db';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      try {
        const { email, action } = req.body;

        if (!email) {
          return res.status(400).json({
            success: false,
            error: 'Email is required'
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

        if (action === 'unsubscribe') {
          const unsubscribed = Database.unsubscribeNewsletter(email);
          
          if (!unsubscribed) {
            return res.status(404).json({
              success: false,
              error: 'Email not found in subscription list'
            });
          }

          res.status(200).json({
            success: true,
            message: 'Successfully unsubscribed from newsletter'
          });
        } else {
          const subscriber = Database.subscribeNewsletter(email);

          res.status(201).json({
            success: true,
            data: subscriber,
            message: 'Successfully subscribed to newsletter'
          });
        }
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Failed to process newsletter subscription'
        });
      }
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).json({
        success: false,
        error: `Method ${req.method} not allowed`
      });
  }
}
