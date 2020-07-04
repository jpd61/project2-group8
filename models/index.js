const User = require('./User');
const Whiskey = require('./Whiskey');
const Comment = require('./Comment');
const Vote = require('./Vote');

User.hasMany(Whiskey, {
    foreignKey: 'user_id'
});

Whiskey.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(Whiskey, {
    through: Vote,
    as: 'voted_whiskey',
    foreignKey: 'user_id'
});

Whiskey.belongsToMany(User, {
    through: Vote,
    as: 'voted_whiskey',
    foreignKey: 'whiskey_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Vote.belongsTo(Whiskey, {
    foreignKey: 'whiskey_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});
  
Whiskey.hasMany(Vote, {
    foreignKey: 'whiskey_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Comment.belongsTo(Whiskey, {
    foreignKey: 'whiskey_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});
  
Whiskey.hasMany(Comment, {
    foreignKey: 'whiskey_id'
});

module.exports = {User, Whiskey, Vote, Comment};