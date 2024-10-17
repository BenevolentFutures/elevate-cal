// models/Promotion.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Event from './Event.js';

const Promotion = sequelize.define('Promotion', {});

User.belongsToMany(Event, { through: Promotion });
Event.belongsToMany(User, { through: Promotion });

export default Promotion;
