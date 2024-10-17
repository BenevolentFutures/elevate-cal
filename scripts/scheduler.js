import cron from 'node-cron';
import axios from 'axios';

export function startScheduler() {
  // Schedule the task to run every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    console.log('Running event import...');
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/events/import`);
      console.log('Event import completed successfully');
    } catch (error) {
      console.error('Error running event import:', error);
    }
  });

  console.log('Event import scheduler started');
}
