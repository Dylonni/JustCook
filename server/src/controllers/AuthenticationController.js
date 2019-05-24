const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'Email ou Pseudo déjà utilisé.'
      })
    }
  },
  async login (req, res) {
    try {
      const {email, username, password} = req.body
      const user = await User.findOne({
        where: {
          email: email,
          username: username
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'Identifiants ou mot de passe incorrects.'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Identifiants ou mot de passe incorrects.'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'Une erreur est survenue lors de la connexion.'
      })
    }
  }
}
