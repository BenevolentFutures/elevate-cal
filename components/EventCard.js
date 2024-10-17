import React, { useState } from 'react';
import { formatDate } from '../utils/dateUtils';
import { promoteEvent } from '../utils/api';

export default function EventCard({ event }) {
  const [promotionCount, setPromotionCount] = useState(event.promotionCount);
  const [isPromoted, setIsPromoted] = useState(event.hasPromoted);
  const [error, setError] = useState(null);

  const handlePromote = async () => {
    try {
      await promoteEvent(event.id);
      setPromotionCount((prevCount) => prevCount + 1);
      setIsPromoted(true);
    } catch (err) {
      console.error('Error promoting event:', err);
      setError('Failed to promote the event. Please try again.');
    }
  };

  return (
    <div className={`p-4 border rounded-lg ${event.isCommunityFavorite ? 'bg-yellow-100' : 'bg-white'}`}>
      <h2 className="text-xl font-semibold mb-2">
        {event.title} {event.isCommunityFavorite && '⭐'}
      </h2>
      <p className="text-gray-600 mb-2">
        {formatDate(event.start_time)} - {formatDate(event.end_time)}
      </p>
      <p className="mb-2">{event.location}</p>
      {error && (
        <div className="mb-2 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePromote}
          disabled={isPromoted}
          className={`px-4 py-2 rounded ${
            isPromoted
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isPromoted ? 'Promoted' : 'Promote'}
        </button>
        <span className="text-gray-600">Promotions: {promotionCount}</span>
      </div>
    </div>
  );
}
