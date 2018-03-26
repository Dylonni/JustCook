import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // Le nom qui sera donné dans le Session Storage console
  storage: window.sessionStorage,
  reducer: state => ({
    isUserLoggedIn: state.isUserLoggedIn, // On garde les state des différents composants
    user: state.user,
    token: state.token,
    isDarkMode: state.isDarkMode // ou window.sessionStorage ou localForage
  })
})

export default new Vuex.Store({
  plugins: [vuexLocalStorage.plugin],
  strict: false,
  state: {
    token: null,
    user: null,
    room: null,
    isUserLoggedIn: false,
    isDarkMode: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = !!(token)
    },
    setUser (state, user) {
      state.user = user
    },
    setRoom (state, room) {
      state.room = room
    },
    setDark (state, isDarkMode) {
      state.isDarkMode = isDarkMode
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setDark ({ commit }, isDarkMode) {
      commit('setDark', isDarkMode)
    },
    setRoom ({ commit }, room) {
      commit('setRoom', room)
    }
  },
  getters: {
    isDark: state => {
      return state.isDarkMode
    }
  }
})
