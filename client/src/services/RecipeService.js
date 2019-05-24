import Api from '@/services/Api'

export default {
  index () {
    return Api().get('recipes')
  },
  show (recipeId) {
    return Api().get(`recipes/${recipeId}`)
  },
  post (recipe) {
    return Api().post('recipes', recipe)
  }
}
