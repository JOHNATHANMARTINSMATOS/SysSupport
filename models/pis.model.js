// models/pis.js

module.exports = (sequelize, DataTypes) => {
    const PIS = sequelize.define('PIS', {
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
  
    return PIS;
  };
  