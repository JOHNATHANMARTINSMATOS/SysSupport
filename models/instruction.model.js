// models/instruction.js

module.exports = (sequelize, DataTypes) => {
    const Instruction = sequelize.define('Instruction', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT, // Utilizamos TEXT para permitir descrições longas
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  
    return Instruction;
  };
  