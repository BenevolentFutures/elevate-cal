import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import ElevatedUser from './ElevatedUser.js';

const ElevatedUserSetting = sequelize.define('ElevatedUserSetting', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  default_view: {
    type: DataTypes.ENUM('timeline', 'calendar'),
    defaultValue: 'timeline'
  },
  notification_preferences: {
    type: DataTypes.JSON,
    defaultValue: {}
  }
}, {
  tableName: 'elevated_user_settings'
});

ElevatedUserSetting.belongsTo(ElevatedUser, { foreignKey: 'userId' });
ElevatedUser.hasOne(ElevatedUserSetting, { foreignKey: 'userId' });

export default ElevatedUserSetting;