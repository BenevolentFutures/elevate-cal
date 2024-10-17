import ElevatedPromotion from '../../../models/ElevatedPromotion';
import Event from '../../../models/Event';
import { getSessionUserId } from '../../../utils/auth';

export default async function promoteHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { eventId } = req.body;

  try {
    // Authenticate the user
    const userId = await getSessionUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if the promotion already exists
    const existingPromotion = await ElevatedPromotion.findOne({
      where: { UserId: userId, EventId: eventId },
    });

    if (existingPromotion) {
      return res.status(400).json({ message: 'Event already promoted' });
    }

    // Create the promotion
    await ElevatedPromotion.create({ UserId: userId, EventId: eventId });

    res.status(200).json({ message: 'Event promoted successfully' });
  } catch (error) {
    console.error('Promotion error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}