// models/regime.js

module.exports = (sequelize, DataTypes) => {
    const Regime = sequelize.define('Regime', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT // Usando TEXT para permitir descrições mais longas
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  
    return Regime;
  };
  