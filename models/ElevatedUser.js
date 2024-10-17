import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ElevatedUser = sequelize.define('ElevatedUser', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});

ElevatedUser.associate = (models) => {
  ElevatedUser.belongsToMany(models.Event, {
    through: models.ElevatedPromotion,
    as: 'Promotions',
  });
};

export default ElevatedUser;