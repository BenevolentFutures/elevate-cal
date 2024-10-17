import { importEvents } from '../../../scripts/importEvents';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await importEvents();
      res.status(200).json({ message: 'Events imported successfully' });
    } catch (error) {
      console.error('Error importing events:', error);
      res.status(500).json({ message: 'Error importing events' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}