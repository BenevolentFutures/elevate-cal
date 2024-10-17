import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const ElevatedPromotion = sequelize.define('ElevatedPromotion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'elevated_users',
      key: 'id'
    }
  },
  EventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'events',
      key: 'id'
    }
  }
}, {
  tableName: 'elevated_promotions'
});

ElevatedPromotion.belongsTo(User, { foreignKey: 'UserId' });

export default ElevatedPromotion;
