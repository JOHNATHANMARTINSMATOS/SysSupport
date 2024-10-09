// models/manual.js

module.exports = (sequelize, DataTypes) => {
    const Manual = sequelize.define('Manual', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT // Usando TEXT para permitir descrições longas
      },
      file: {
        type: DataTypes.STRING // Armazena o caminho para o arquivo anexado
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  
    return Manual;
  };
  