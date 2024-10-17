import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

class ElevatedPromotion extends Model {}

ElevatedPromotion.init(
  {
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    EventId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: 'ElevatedPromotion',
  }
);

export default ElevatedPromotion;
