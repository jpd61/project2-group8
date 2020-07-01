const User = require('./User');
const Whiskey = require('./Whiskey');

//Placeholder for tonight
User.hasMany(Whiskey, {
    foreignKey: 'user_id'
});

module.exports = {User, Whiskey};