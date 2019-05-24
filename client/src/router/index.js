import Vue from 'vue'
import Router from 'vue-router'
import Lobby from '@/components/Lobby'
import Register from '@/components/Register'
import LoginPage from '@/components/Login'
import ViewRecipe from '@/components/ViewRecipe'
import CreateRecipe from '@/components/CreateRecipe'
import AlertPage from '@/components/Alert'
import ToggleButton from 'vue-js-toggle-button'

Vue.use(ToggleButton)
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: Lobby
    },
    {
      path: '/alert',
      name: 'alert',
      component: AlertPage
    },
    {
      path: '/recipe/create',
      name: 'recipe-create',
      component: CreateRecipe
    },
    {
      path: '*',
      name: '*',
      redirect: '/lobby'
    },
    {
      path: '/recipes/:recipeId',
      name: 'recipe',
      component: ViewRecipe
    }
  ]
})
