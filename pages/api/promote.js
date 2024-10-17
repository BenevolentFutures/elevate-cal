import { Event, Promotion } from '../../../../models';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.query;
    // TODO: Get the user ID from the session once authentication is implemented
    const userId = 1; // Placeholder user ID

    try {
      const [promotion, created] = await Promotion.findOrCreate({
        where: { UserId: userId, EventId: id },
      });

      if (created) {
        await Event.increment('promotion_count', { where: { id } });
        const updatedEvent = await Event.findByPk(id);
        
        // Check if the event should become a community favorite
        if (updatedEvent.promotion_count >= 2 && !updatedEvent.is_community_favorite) {
          await updatedEvent.update({ is_community_favorite: true });
        }

        res.status(200).json({ message: 'Event promoted successfully' });
      } else {
        res.status(400).json({ message: 'Event already promoted by this user' });
      }
    } catch (error) {
      console.error('Error promoting event:', error);
      res.status(500).json({ message: 'Error promoting event' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}