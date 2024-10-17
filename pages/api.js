import axios from 'axios';

export async function fetchEvents() {
  const response = await axios.get('/api/events');
  return response.data;
}

export async function promoteEvent(eventId) {
  const response = await axios.post(`/api/events/${eventId}/promote`);
  return response.data;
}