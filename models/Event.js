// models/Event.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Event = sequelize.define('Event', {
  eventId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  title: DataTypes.STRING,
  startTime: DataTypes.DATE,
  endTime: DataTypes.DATE,
  location: DataTypes.STRING,
  isCommunityFavorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Event;
