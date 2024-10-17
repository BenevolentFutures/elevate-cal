import axios from 'axios';
import { Event, Group, User } from '../models/index.js';
import { Op } from 'sequelize';

const API_URL = 'https://api.sola.day/event/list';
const GROUP_ID = 'edgecitylanna';
const LIMIT = 1000;

async function fetchEvents(startDate, endDate) {
  try {
    const params = new URLSearchParams({
      group_id: GROUP_ID,
      limit: LIMIT,
      start_date: startDate,
      end_date: endDate,
    });
    const fullUrl = `${API_URL}?${params.toString()}`;
    console.log(`Fetching events from URL: ${fullUrl}`);

    const response = await axios.get(fullUrl);
    
    if (!response.data || !Array.isArray(response.data.events)) {
      console.error('Unexpected response format:', response.data);
      return [];
    }

    console.log(`Fetched ${response.data.events.length} events`);
    return response.data.events;
  } catch (error) {
    console.error('Error fetching events:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    return [];
  }
}

export async function importEvents() {
  console.log('Starting importEvents function');
  const currentDate = new Date();
  const endDate = new Date('2024-11-30');
  let startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - 1); // Start from yesterday to catch any last-minute changes

  console.log(`Date range: ${formatDate(startDate)} to ${formatDate(endDate)}`);

  let totalEvents = 0;
  let totalVenues = 0;
  let totalUsers = 0;
  let totalGroups = 0;

  while (startDate <= endDate) {
    const formattedStartDate = formatDate(startDate);
    const nextDay = new Date(startDate);
    nextDay.setDate(nextDay.getDate() + 7);
    const formattedEndDate = formatDate(nextDay);

    console.log(`Fetching events from ${formattedStartDate} to ${formattedEndDate}`);
    const events = await fetchEvents(formattedStartDate, formattedEndDate);
    console.log(`Received ${events.length} events`);

    for (const eventData of events) {
      try {
        const [event, created] = await Event.findOrCreate({
          where: { id: eventData.id },
          defaults: {
            title: eventData.title,
            event_type: eventData.event_type,
            track_id: eventData.track_id,
            start_time: eventData.start_time,
            end_time: eventData.end_time,
            timezone: eventData.timezone,
            meeting_url: eventData.meeting_url,
            location: eventData.location,
            formatted_address: eventData.formatted_address,
            geo_lat: eventData.geo_lat,
            geo_lng: eventData.geo_lng,
            cover_url: eventData.cover_url,
            require_approval: eventData.require_approval,
            tags: eventData.tags,
            max_participant: eventData.max_participant,
            min_participant: eventData.min_participant,
            participants_count: eventData.participants_count,
            badge_class_id: eventData.badge_class_id,
            external_url: eventData.external_url,
            venue: eventData.venue,
            event_roles: eventData.event_roles,
          },
        });

        if (created) totalEvents++;

        if (!created) {
          // Update existing event
          await event.update({
            title: eventData.title,
            event_type: eventData.event_type,
            track_id: eventData.track_id,
            start_time: eventData.start_time,
            end_time: eventData.end_time,
            timezone: eventData.timezone,
            meeting_url: eventData.meeting_url,
            location: eventData.location,
            formatted_address: eventData.formatted_address,
            geo_lat: eventData.geo_lat,
            geo_lng: eventData.geo_lng,
            cover_url: eventData.cover_url,
            require_approval: eventData.require_approval,
            tags: eventData.tags,
            max_participant: eventData.max_participant,
            min_participant: eventData.min_participant,
            participants_count: eventData.participants_count,
            badge_class_id: eventData.badge_class_id,
            external_url: eventData.external_url,
            venue: eventData.venue,
            event_roles: eventData.event_roles,
          });
        }

        // Handle owner and group associations
        if (eventData.owner) {
          const [owner, ownerCreated] = await User.findOrCreate({
            where: { id: eventData.owner.id },
            defaults: {
              handle: eventData.owner.handle,
              username: eventData.owner.username,
              nickname: eventData.owner.nickname,
              image_url: eventData.owner.image_url,
            },
          });
          await event.setOwner(owner);
          if (ownerCreated) totalUsers++;
        }

        if (eventData.group) {
          const [group, groupCreated] = await Group.findOrCreate({
            where: { id: eventData.group.id },
            defaults: {
              handle: eventData.group.handle,
              username: eventData.group.username,
              nickname: eventData.group.nickname,
              timezone: eventData.group.timezone,
            },
          });
          await event.setGroup(group);
          if (groupCreated) totalGroups++;
        }

        if (eventData.venue) {
          totalVenues++;
        }

      } catch (error) {
        console.error('Error processing event:', eventData.id, error);
      }
    }

    startDate.setDate(startDate.getDate() + 7);
  }

  console.log('\nImport Statistics ::');
  console.log(`Total Events Imported/Updated: ${totalEvents}`);
  console.log(`Total Venues Processed: ${totalVenues}`);
  console.log(`Total Users Imported: ${totalUsers}`);
  console.log(`Total Groups Imported: ${totalGroups}`);

  console.log('Event import completed');
}

// Add this helper function at the end of the file
function formatDate(date) {
  return date.toISOString().split('T')[0];
}
