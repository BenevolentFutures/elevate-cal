import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Event from './Event.js';

const HostInfo = sequelize.define('HostInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data: DataTypes.JSON
}, {
  tableName: 'host_infos'
});

HostInfo.belongsTo(Event, { foreignKey: 'eventId' });
Event.hasOne(HostInfo, { foreignKey: 'eventId' });

export default HostInfo;
