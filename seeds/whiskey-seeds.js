// For future development

const { Whiskey } = require('../models');

const whiskeyData = [
  {
    name: 'Garrison Brothers',
    type: 'Bourbon',
    created_at: new Date(),
    // comments: [{}, {}],
    // user: {
    //     username: 'test_user'
    // }
  },
  {
    name: 'TX Whiskey',
    type: 'Bourbon',
    created_at: new Date(),
    // comments: [{}, {}],
    // user: {
    //     username: 'test_user'
    // }
  },
  {
    name: 'Pappy Van Winkle',
    type: 'Bourbon',
    created_at: new Date(),
    // comments: [{}, {}],
    // user: {
    //     username: 'test_user'
    // }
  },
 
];

const seedWhiskey = () => Whiskey.bulkCreate(whiskeyData);

module.exports = seedWhiskey;