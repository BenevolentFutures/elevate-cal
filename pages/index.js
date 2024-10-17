import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import EventTimeline from '../components/EventTimeline';
import { fetchEvents } from '../utils/api';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Elevate Cal - Timeline Below</title>
        <meta name="description" content="Elevate your calendar management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-8">
        <h1 className="text-3xl font-bold mb-6">Elevate Cal Timeline</h1>
        {loading ? (
          <p>Loading events...</p>
        ) : (
          <EventTimeline events={events} />
        )}
      </main>
    </div>
  );
}