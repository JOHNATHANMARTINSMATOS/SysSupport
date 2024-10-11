module.exports = (sequelize, DataTypes) => {
  const Error = sequelize.define('Error', {
      title: {
          type: DataTypes.STRING,
          allowNull: false
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

  Error.associate = models => {
      Error.belongsTo(models.Category, {
          foreignKey: 'categoryId',
          as: 'category'
      });
      Error.belongsTo(models.Subcategory, {
          foreignKey: 'subcategoryId',
          as: 'subcategory'
      });
  };

  return Error;
};
