import ElevatedPromotion from '../../../models/ElevatedPromotion';
import Event from '../../../models/Event';
import { getSessionUserId } from '../../../utils/auth';
import ElevatedUser from '../../../models/ElevatedUser';

export default async function promoteHandler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { eventId } = req.body;

  if (!eventId) {
    return res.status(400).json({ message: 'Event ID is required.' });
  }

  try {
    // Authenticate the user
    const userId = await getSessionUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log('User ID:', userId);
    console.log('Event ID:', eventId);

    // Check if the user exists in the elevated_users table
    const user = await ElevatedUser.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found in elevated_users table.' });
    }

    // Check if the promotion already exists
    const existingPromotion = await ElevatedPromotion.findOne({
      where: { UserId: userId, EventId: eventId },
    });

    if (existingPromotion) {
      return res.status(400).json({ message: 'You have already promoted this event.' });
    }

    // Create the promotion
    const promotion = await ElevatedPromotion.create({ UserId: userId, EventId: eventId });
    console.log('Promotion created:', promotion);

    // Increment promotion count
    const event = await Event.findByPk(eventId);
    await event.increment('promotion_count');

    // Check if the event should become a community favorite
    if (event.promotion_count >= 2 && !event.is_community_favorite) {
      await event.update({ is_community_favorite: true });
    }

    res.status(200).json({ message: 'Event promoted successfully' });
  } catch (error) {
    console.error('Promotion error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
