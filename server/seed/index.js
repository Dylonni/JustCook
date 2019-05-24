const {
  sequelize,
  Recipe
} = require('../src/models')

const Promise = require('bluebird')
const recipes = require('./recipes.json')

sequelize.sync({force: true})
  .then(async function () {
    await Promise.all(
      recipes.map(recipe => {
        Recipe.create(recipe)
      })
    )
  })
