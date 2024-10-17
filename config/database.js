import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('elevated_cal', 'root', 'lanna', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export default sequelize;
