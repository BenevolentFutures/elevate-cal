import sequelize from '../config/database.js';
import Event from '../models/Event.js';

async function printNext10Events() {
  try {
    await sequelize.authenticate();

    console.log('Next 10 Events:');
    console.log('==============\n');

    const events = await Event.findAll({
      where: {
        startTime: {
          [sequelize.Op.gte]: new Date() // Events starting from now
        }
      },
      order: [['startTime', 'ASC']],
      limit: 10
    });

    events.forEach((event, index) => {
      console.log(`Event ${index + 1}:`);
      console.log(JSON.stringify(event.toJSON(), null, 2));
      console.log('---');
    });

  } catch (error) {
    console.error('Error printing next 10 events:', error);
  } finally {
    await sequelize.close();
  }
}

printNext10Events().catch(error => console.error('Error in printNext10Events:', error));