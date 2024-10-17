import sequelize from '../config/database.js';
import User from './User.js';
import Event from './Event.js';
import Promotion from './Promotion.js';

async function syncModels() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    await sequelize.close();
  }
}

// Run the function
syncModels().catch(error => console.error('Error in syncModels:', error));

export default syncModels;
