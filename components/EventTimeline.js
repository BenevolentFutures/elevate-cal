import React from 'react';
import EventCard from './EventCard';

export default function EventTimeline({ events }) {
  if (!Array.isArray(events) || events.length === 0) {
    return <p className="text-center">No events available.</p>;
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
