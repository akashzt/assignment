const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/db');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    unique: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 0,
    },
  },
  hobbies: {
    type: DataTypes.TEXT, // Use TEXT instead of ARRAY for hobbies
    allowNull: false,
    defaultValue: '[]', // Default value is a string representation of an empty array
    get() {
      const rawValue = this.getDataValue('hobbies');
      return JSON.parse(rawValue);
    },
    set(value) {
      this.setDataValue('hobbies', JSON.stringify(value));
    },
  }
}, {
  timestamps: true,
});

module.exports = User;
