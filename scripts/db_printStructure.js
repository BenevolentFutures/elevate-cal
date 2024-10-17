import sequelize from '../config/database.js';
import User from '../models/User.js';
import Event from '../models/Event.js';
import Group from '../models/Group.js';
import HostInfo from '../models/HostInfo.js';
import ElevatedUser from '../models/ElevatedUser.js';
import ElevatedPromotion from '../models/ElevatedPromotion.js';
import ElevatedUserSetting from '../models/ElevatedUserSetting.js';

async function printDatabaseStructure() {
  try {
    // Ensure all models are imported and initialized
    await sequelize.authenticate();
    
    console.log('Database Structure:');
    console.log('===================\n');

    const models = sequelize.models;
    for (const modelName in models) {
      const model = models[modelName];
      console.log(`Table: ${model.tableName}`);
      console.log('Attributes:');
      
      const attributes = model.rawAttributes;
      for (const attrName in attributes) {
        const attr = attributes[attrName];
        console.log(`  - ${attrName}: ${attr.type.key}${attr.allowNull ? '' : ' (NOT NULL)'}${attr.unique ? ' (UNIQUE)' : ''}${attr.primaryKey ? ' (PRIMARY KEY)' : ''}`);
      }

      console.log('Associations:');
      if (model.associations) {
        for (const assocName in model.associations) {
          const assoc = model.associations[assocName];
          console.log(`  - ${assoc.associationType} ${assoc.target.name} as ${assocName}`);
        }
      } else {
        console.log('  No associations');
      }

      // Add code to print the number of rows in each table
      const rowCount = await model.count();
      console.log(`Number of rows: ${rowCount}\n`);
    }

  } catch (error) {
    console.error('Error printing database structure:', error);
  } finally {
    await sequelize.close();
  }
}

// Run the function
printDatabaseStructure().catch(error => console.error('Error in printDatabaseStructure:', error));
