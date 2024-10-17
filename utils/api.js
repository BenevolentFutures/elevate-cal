import axios from 'axios';

export async function fetchEvents(page = 1) {
  const response = await axios.get(`/api/events?page=${page}`, { withCredentials: true });
  return response.data;
}

export async function promoteEvent(eventId) {
  const response = await axios.post(`/api/events/promote`, { eventId }, { withCredentials: true });
  return response.data;
}
