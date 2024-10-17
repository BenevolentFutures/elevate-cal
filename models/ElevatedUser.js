import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Event from './Event.js';

const ElevatedUser = sequelize.define('ElevatedUser', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'elevated_users',
  timestamps: true,
});

// Associations are defined in models/index.js

export default ElevatedUser;
