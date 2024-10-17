import sequelize from '../config/database.js';
import { User, Event, Group } from '../models/index.js';

async function clearSocialLayerData() {
  try {
    // Start transaction
    const transaction = await sequelize.transaction();

    // Clear data from tables
    await Event.destroy({ where: {}, transaction });
    await User.destroy({ where: {}, transaction });
    await Group.destroy({ where: {}, transaction });

    // Commit transaction
    await transaction.commit();

    console.log('Social layer data cleared successfully.');
  } catch (error) {
    // Rollback transaction in case of error
    if (transaction) await transaction.rollback();
    console.error('Failed to clear social layer data:', error);
  } finally {
    // Close the sequelize connection
    await sequelize.close();
  }
}

// Run the clear function
clearSocialLayerData().catch(error => console.error('Error in clearSocialLayerData:', error));