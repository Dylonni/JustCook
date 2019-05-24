<template>
  <v-layout fluid justify-center>
    <v-flex xs12 lg6>
      <div class="white elevation-2">
        <v-toolbar flat dense class="purple lighten-1" dark>
          <v-toolbar-title>Inscription</v-toolbar-title>
        </v-toolbar>
          <div class="pl-4 pr-4 pt-2 pb-2">
            <form name="mericook-form"
              autocomplete="off">
              <v-text-field
              label="Votre pseudo"
              type="username"
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
            </form>
            <br>
            <div class="error" v-html="error"></div>
            <br>
            <v-spacer></v-spacer>
            <v-btn class="purple lighten-2" dark @click="register">S'inscrire</v-btn>
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
  methods: {
    async register () {
      try {
        const response = await AuthentificationService.register({
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

.mericorn {
  height: 300px;
  width: 250px;
}
</style>
