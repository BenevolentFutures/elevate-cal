import Event from '../../../models/Event.js';
import { getSessionUserId } from '../../../utils/auth.js';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const userId = await getSessionUserId(req);
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const page = parseInt(req.query.page) || 1;
      const limit = 10; // Adjust as needed
      const offset = (page - 1) * limit;

      const events = await Event.findAll({
        limit,
        offset,
        order: [['start_time', 'ASC']], // Change this line
      });

      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
