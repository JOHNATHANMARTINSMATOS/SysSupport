module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    // Remova associações ao modelo Error
    return Category;
  };
  