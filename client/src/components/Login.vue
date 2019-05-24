<template>
  <v-layout fluid justify-center>
     <v-flex xs12 sm8 md6 lg6>
       <div class="white elevation-2">
        <v-toolbar flat dense class="purple darken-4" dark>
          <v-toolbar-title>Se Connecter</v-toolbar-title>
        </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
             <v-text-field
              label="Pseudo"
              v-model="username"
            ></v-text-field>
              <v-text-field
              label="Email"
              v-model="email"
            ></v-text-field>
              <v-text-field
              label="Mot de passe"
              type="password"
              v-model="password"
            ></v-text-field>
            <br>
            <div class="error" v-html="error"></div>
            <br>
            <v-btn class="purple darken-4 mb-5" dark @click="login">Connexion</v-btn>
            <v-spacer></v-spacer>
           <span> Pas de compte ?</span>
            <router-link to="/register" tag="button"><span class="vert">S'inscrire</span></router-link>
      </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthentificationService from '@/services/AuthentificationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      username: '',
      error: null
    }
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push({
        name: 'login'
      })
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthentificationService.login({
          email: this.email,
          password: this.password,
          username: this.username
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$session.start()
        this.$session.set('token', response.data.token)
        this.$router.push({
          name: 'lobby'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: white;
}
.vert{
  color: green;
}
    .mericorn {
      height: 320px;
      width: 235px;
    }
    .hacheun{
      color: indigo;
    }
</style>
