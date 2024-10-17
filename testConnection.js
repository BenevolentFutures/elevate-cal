import sequelize from './config/database.js';
import { testConnection } from './config/database.js';

const runTest = async () => {
  await testConnection();
  await sequelize.close();
  process.exit(0);
};

runTest();
