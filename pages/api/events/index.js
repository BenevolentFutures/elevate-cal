import Event from '../../../models/Event';
import { getSessionUserId } from '../../../utils/auth';

export default async function eventsHandler(req, res) {
  const { page = 1 } = req.query;
  const limit = 50;
  const offset = (page - 1) * limit;

  try {
    // Authenticate the user
    const userId = await getSessionUserId(req);
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch events with promotion count
    const events = await Event.findAll({
      limit,
      offset,
      order: [['start_time', 'ASC']],
      include: ['Promotions'],
    });

    // Map events to include promotion info
    const eventsWithPromotions = events.map((event) => {
      const promotionCount = event.Promotions.length;
      const isCommunityFavorite = promotionCount >= 2;
      return {
        ...event.get(),
        promotionCount,
        isCommunityFavorite,
        hasPromoted: event.Promotions.some((p) => p.UserId === userId),
      };
    });

    res.status(200).json(eventsWithPromotions);
  } catch (error) {
    console.error('Events fetch error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}