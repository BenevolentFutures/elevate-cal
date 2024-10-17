// models/Event.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Group from './Group.js';

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: DataTypes.STRING,
  event_type: DataTypes.STRING,
  track_id: DataTypes.STRING,
  start_time: DataTypes.DATE,
  end_time: DataTypes.DATE,
  timezone: DataTypes.STRING,
  meeting_url: DataTypes.STRING,
  location: DataTypes.STRING,
  formatted_address: DataTypes.STRING,
  geo_lat: DataTypes.FLOAT,
  geo_lng: DataTypes.FLOAT,
  cover_url: DataTypes.STRING,
  require_approval: DataTypes.BOOLEAN,
  tags: DataTypes.JSON,
  max_participant: DataTypes.INTEGER,
  min_participant: DataTypes.INTEGER,
  participants_count: DataTypes.INTEGER,
  badge_class_id: DataTypes.STRING,
  external_url: DataTypes.STRING,
  venue: DataTypes.JSON,
  event_roles: DataTypes.JSON,
  promotion_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  is_community_favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'events'
});

Event.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
Event.belongsTo(Group, { foreignKey: 'groupId' });

export default Event;
