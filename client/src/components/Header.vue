<template>
    <v-toolbar fixed dark class="purple darken-4">
        <v-toolbar-title class="hidden-xs-only mr-4">
            <span class="home" @click="navigateTo({name:'lobby'})">JustCook</span>
        </v-toolbar-title>
        <v-spacer class="hidden-xs-only"></v-spacer>
        <v-toolbar-items>
             <v-btn flat dark @click="navigateTo({name:'lobby'})">
                <v-icon large color="white">library_books</v-icon><span>Recettes</span>
                </v-btn>
             <v-btn flat dark @click="navigateTo({name:'Recherche'})">
                <v-icon large color="white">search</v-icon><span class="hidden-xs-only"> Rechercher</span>
                </v-btn>
            <v-btn v-if="!$store.state.isUserLoggedIn" flat dark @click="navigateTo({name:'login'})">
                <v-icon large color="white">account_circle</v-icon>Connexion
                </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
    cursor: pointer;
}
v-icon:hover{
  color: orange;
}
</style>
