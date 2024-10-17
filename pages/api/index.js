import { Event } from '../../../models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const events = await Event.findAll({
        order: [['start_time', 'ASC']],
        // Add any necessary includes or where clauses
      });
      res.status(200).json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ message: 'Error fetching events' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}