// models/cofins.js

module.exports = (sequelize, DataTypes) => {
    const COFINS = sequelize.define('COFINS', {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rate: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  
    return COFINS;
  };
  