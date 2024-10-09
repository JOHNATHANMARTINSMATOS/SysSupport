// models/script.js

module.exports = (sequelize, DataTypes) => {
    const Script = sequelize.define('Script', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      subcategory: {
        type: DataTypes.STRING
      },
      script: {
        type: DataTypes.TEXT, // Usando TEXT para armazenar scripts potencialmente longos
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  
    return Script;
  };
  