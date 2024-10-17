import React from 'react';
import EventCard from './EventCard';

export default function EventTimeline({ events }) {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}