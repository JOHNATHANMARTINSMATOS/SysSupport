module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Category.associate = models => {
      // Associação de Category com Subcategory
      Category.hasMany(models.Subcategory, { as: 'subcategories', foreignKey: 'categoryId' });
      
      // Associação de Category com Error
      Category.hasMany(models.Error, { foreignKey: 'categoryId', as: 'errors' });
    };
  
    return Category;
  };
  