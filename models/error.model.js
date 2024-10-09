// models/error.js

module.exports = (sequelize, DataTypes) => {
    const Error = sequelize.define('Error', {
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
      description: {
        type: DataTypes.TEXT, // Usando TEXT para descrições longas
        allowNull: false
      },
      responsible: {
        type: DataTypes.STRING
      },
      resolutionDate: {
        type: DataTypes.DATE
      },
      image: {
        type: DataTypes.STRING // Armazena o caminho para o arquivo de imagem
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  
    return Error;
  };
  