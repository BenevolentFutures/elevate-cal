import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';

export default function TimelinePage() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    const res = await fetch(`/api/events?page=${page}`);
    const data = await res.json();
    setEvents((prevEvents) => [...prevEvents, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Timeline</h1>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      {loading && <p className="text-center">Loading...</p>}
    </div>
  );
}