import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Group = sequelize.define('Group', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  handle: DataTypes.STRING,
  username: DataTypes.STRING,
  nickname: DataTypes.STRING,
  timezone: DataTypes.STRING
}, {
  tableName: 'groups'
});

export default Group;
