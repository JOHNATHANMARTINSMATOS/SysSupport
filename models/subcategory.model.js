module.exports = (sequelize, DataTypes) => {
    const Subcategory = sequelize.define('Subcategory', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Subcategory.associate = models => {
      // Associação de Subcategory com Category
      Subcategory.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      
      // Associação de Subcategory com Error
      Subcategory.hasMany(models.Error, { foreignKey: 'subcategoryId', as: 'errors' });
    };
  
    return Subcategory;
  };
  