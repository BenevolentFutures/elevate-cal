import sequelize from '../config/database.js';
import User from '../models/User.js';
import Event from '../models/Event.js';
import Promotion from '../models/Promotion.js';

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
      console.log('\n');
    }

  } catch (error) {
    console.error('Error printing database structure:', error);
  } finally {
    await sequelize.close();
  }
}

// Run the function
printDatabaseStructure().catch(error => console.error('Error in printDatabaseStructure:', error));