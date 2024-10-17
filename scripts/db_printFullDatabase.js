import sequelize from '../config/database.js';
import User from '../models/User.js';
import Event from '../models/Event.js';
import Group from '../models/Group.js';
import HostInfo from '../models/HostInfo.js';
import ElevatedUser from '../models/ElevatedUser.js';
import ElevatedPromotion from '../models/ElevatedPromotion.js';
import ElevatedUserSetting from '../models/ElevatedUserSetting.js';

async function printFullDatabase() {
  try {
    await sequelize.authenticate();

    console.log('Full Database Contents:');
    console.log('=======================\n');

    const models = sequelize.models;
    for (const modelName in models) {
      const model = models[modelName];
      console.log(`Table: ${model.tableName}`);
      
      const records = await model.findAll();
      records.forEach((record, index) => {
        console.log(`Record ${index + 1}:`);
        console.log(JSON.stringify(record.toJSON(), null, 2));
        console.log('---');
      });

      console.log('\n');
    }

  } catch (error) {
    console.error('Error printing full database:', error);
  } finally {
    await sequelize.close();
  }
}

printFullDatabase().catch(error => console.error('Error in printFullDatabase:', error));
