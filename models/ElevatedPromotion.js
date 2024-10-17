import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import ElevatedUser from './ElevatedUser.js';
import Event from './Event.js';

const ElevatedPromotion = sequelize.define('ElevatedPromotion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  promoted_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'elevated_promotions'
});

ElevatedPromotion.belongsTo(ElevatedUser, { foreignKey: 'userId' });
ElevatedPromotion.belongsTo(Event, { foreignKey: 'eventId' });

ElevatedUser.hasMany(ElevatedPromotion, { foreignKey: 'userId' });
Event.hasMany(ElevatedPromotion, { foreignKey: 'eventId' });

export default ElevatedPromotion;