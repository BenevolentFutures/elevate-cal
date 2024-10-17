import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt';

const ElevatedUser = sequelize.define('ElevatedUser', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'elevated_users',
  hooks: {
    beforeCreate: async (user) => {
      if (user.password === 'honest') {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

ElevatedUser.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default ElevatedUser;