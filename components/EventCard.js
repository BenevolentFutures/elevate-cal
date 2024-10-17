import React, { useState } from 'react';
import { formatDate } from '../utils/dateUtils';
import { promoteEvent } from '../utils/api';

export default function EventCard({ event }) {
  const [promotionCount, setPromotionCount] = useState(event.promotion_count);
  const [isPromoted, setIsPromoted] = useState(false);

  const handlePromote = async () => {
    try {
      await promoteEvent(event.id);
      setPromotionCount(prevCount => prevCount + 1);
      setIsPromoted(true);
    } catch (error) {
      console.error('Error promoting event:', error);
    }
  };

  return (
    <div className={`p-4 border rounded-lg ${event.is_community_favorite ? 'bg-yellow-100' : 'bg-white'}`}>
      <h2 className="text-xl font-semibold mb-2">
        {event.title} {event.is_community_favorite && '⭐'}
      </h2>
      <p className="text-gray-600 mb-2">{formatDate(event.start_time)} - {formatDate(event.end_time)}</p>
      <p className="mb-2">{event.location}</p>
      <div className="flex items-center justify-between">
        <button
          onClick={handlePromote}
          disabled={isPromoted}
          className={`px-4 py-2 rounded ${isPromoted ? 'bg-gray-300' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          {isPromoted ? 'Promoted' : 'Promote'}
        </button>
        <span className="text-gray-600">Promotions: {promotionCount}</span>
      </div>
    </div>
  );
}