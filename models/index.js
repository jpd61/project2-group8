const User = require('./User');
const Whiskey = require('./Whiskey');
const Comment = require('./Comment.js');

User.hasMany(Whiskey, {
    foreignKey: 'user_id'
});

Whiskey.belongsTo(User, {
    foreignKey: 'user_id',
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

module.exports = {User, Whiskey, Comment};