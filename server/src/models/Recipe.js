module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    etapes: DataTypes.INTEGER,
    category: DataTypes.STRING,
    image: DataTypes.STRING,
    difficulty: DataTypes.INTEGER
  })

  Recipe.associate = function (models) {
  }

  return Recipe
}
