import Event from './Event.js';
import ElevatedPromotion from './ElevatedPromotion.js';
import User from './User.js';
import Group from './Group.js';
import HostInfo from './HostInfo.js';
import ElevatedUser from './ElevatedUser.js';
import ElevatedUserSetting from './ElevatedUserSetting.js';

// Define associations after all models are imported
// Event.hasMany(ElevatedPromotion, { as: 'Promotions', foreignKey: 'EventId' });
// ElevatedPromotion.belongsTo(Event, { foreignKey: 'EventId' });

// ElevatedPromotion.belongsTo(User, { foreignKey: 'UserId' });
// User.hasMany(ElevatedPromotion, { foreignKey: 'UserId' });

// Add other associations as needed
// Example:
Event.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
Event.belongsTo(Group, { foreignKey: 'groupId' });

User.belongsToMany(Event, {
  through: ElevatedPromotion,
  foreignKey: 'UserId',
  otherKey: 'EventId',
  as: 'PromotedEvents'
});

Event.belongsToMany(User, {
  through: ElevatedPromotion,
  foreignKey: 'EventId',
  otherKey: 'UserId',
  as: 'Promoters'
});

// Export all models
export {
  Event,
  ElevatedPromotion,
  User,
  Group,
  HostInfo,
  ElevatedUser,
  ElevatedUserSetting
};
