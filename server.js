import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { startScheduler } from './scripts/scheduler.js';
import { importEvents } from './scripts/importEvents.js';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
    
    // Call importEvents immediately when the server starts
    importEvents().catch(error => console.error('Error importing events:', error));
  });

  // Start the scheduler
  startScheduler();
});
