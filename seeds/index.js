//Placeholders...
const seedWhiskeys = require('./whiskey-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedPosts();
  console.log('\n----- WHISKEYS SEEDED -----\n');

  process.exit(0);
};

seedAll();