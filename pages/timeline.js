import { useEffect, useState, useCallback } from 'react';
import EventCard from '../components/EventCard';
import EventTimeline from '../components/EventTimeline';

export default function TimelinePage() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/events?page=${page}`, {
        credentials: 'include', // Ensure cookies are sent
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Unauthorized. Please log in.');
        }
        throw new Error('Failed to fetch events.');
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received.');
      }

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setEvents((prevEvents) => [...prevEvents, ...data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !loading &&
      hasMore
    ) {
      fetchEvents();
    }
  }, [fetchEvents, loading, hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="container mx-auto px-4">
      <main className="py-8">
        <h1 className="text-3xl font-bold mb-6">Elevate Cal Timeline</h1>
        {error && <p className="text-red-500">{error}</p>}
        <EventTimeline events={events} />
        {loading && <p>Loading more events...</p>}
        {!hasMore && <p>No more events to display.</p>}
      </main>
    </div>
  );
}
