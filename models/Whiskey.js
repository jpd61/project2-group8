const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { truncate } = require('./User');

// create our Post model
class Whiskey extends Model {}

// create fields/columns for Post model
Whiskey.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      // We talked about limiting the number of preselected...will need to work in to code
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // should we have pre-selections of Bourbon, Rye, Scotch etc?
      type: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      bottle_size: {
          type: DataTypes.TEXT,
          allowNull: truncate
      },
      price_paid: {
          type: DataTypes.FLOAT,
          allowNull: true
      },
      resell_value: {
          type: DataTypes.FLOAT,
          alllowNull: true
      },
      resell_url: {
          type: DataTypes.TEXT,
          allowNull: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'whiskey'
    }
  );

  module.exports = Whiskey;