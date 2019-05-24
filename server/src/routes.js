const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const RecipeController = require('./controllers/RecipeController')

module.exports = (app) => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

  app.post('/login',
    AuthenticationController.login)

  app.get('/recipes',
    RecipeController.index)
  app.get('/recipes/:recipeId',
    RecipeController.show)
  app.post('/recipes',
    RecipeController.post)
}
