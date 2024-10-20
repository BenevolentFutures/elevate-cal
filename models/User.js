import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  handle: DataTypes.STRING,
  username: DataTypes.STRING,
  nickname: DataTypes.STRING,
  image_url: DataTypes.STRING
}, {
  tableName: 'users'
});

export default User;
