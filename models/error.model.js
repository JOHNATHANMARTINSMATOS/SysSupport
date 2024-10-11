module.exports = (sequelize, DataTypes) => {
  const Error = sequelize.define('Error', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING, // Define como STRING ao invés de INTEGER
      allowNull: false
    },
    subcategory: {
      type: DataTypes.STRING // Define como STRING ao invés de INTEGER
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    responsible: {
      type: DataTypes.STRING
    },
    resolutionDate: {
      type: DataTypes.DATE
    },
    image: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  // Nenhuma associação adicional é necessária
  return Error;
};
