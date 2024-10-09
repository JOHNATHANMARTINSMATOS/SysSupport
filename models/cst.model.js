// models/cst.js

module.exports = (sequelize, DataTypes) => {
    const CST = sequelize.define('CST', {
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
  
    return CST;
  };
  