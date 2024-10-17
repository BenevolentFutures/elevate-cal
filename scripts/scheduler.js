import cron from 'node-cron';
import { importEvents } from './importEvents.js';

export function startScheduler() {
  // Schedule the task to run every 5 minutes
  cron.schedule('*/5 * * * *', () => {
    console.log('Running event import...');
    importEvents();
  });

  console.log('Event import scheduler started');
}
 