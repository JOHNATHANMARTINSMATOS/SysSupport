// models/ipi.js

module.exports = (sequelize, DataTypes) => {
    const IPI = sequelize.define('IPI', {
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
        type: DataTypes.FLOAT, // Usando FLOAT para valores decimais, como alíquotas
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  
    return IPI;
  };
  