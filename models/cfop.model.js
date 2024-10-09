// models/cfop.js

module.exports = (sequelize, DataTypes) => {
    const CFOP = sequelize.define('CFOP', {
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
    
    return CFOP;
  };
  