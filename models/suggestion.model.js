// models/suggestion.js

module.exports = (sequelize, DataTypes) => {
    const Suggestion = sequelize.define('Suggestion', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT, // Usando TEXT para permitir descrições mais longas
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  
    return Suggestion;
  };
  