module.exports = (sequelize, DataTypes) => {
    const Subcategory = sequelize.define('Subcategory', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    // Remova associações ao modelo Error
    return Subcategory;
  };
  