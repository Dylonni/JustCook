const {Recipe} = require('../models')

module.exports = {
  async index (req, res) {
    try {
      const recipes = await Recipe.findAll({
      })
      res.send(recipes)
    } catch (err) {
      res.status(500).send({
        error: 'Une erreur est survenue en récupérant les Recettes'
      })
    }
  },
  async show (req, res) {
    try {
      const recipe = await Recipe.findById(req.params.recipeId)
      res.send(recipe)
    } catch (err) {
      res.status(500).send({
        error: 'Une erreur est survenue en récupérant la Recette'
      })
    }
  },
  async post (req, res) {
    try {
      const recipe = await Recipe.create(req.body)
      res.send(recipe)
    } catch (err) {
      res.status(500).send({
        error: 'Recette déjà existante'
      })
    }
  }
}
