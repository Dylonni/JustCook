<template>
<div>
  <v-layout v-if="$store.state.isUserLoggedIn"> <!-- Drawer Start -->
    <v-toolbar color="purple darken-4" dark fixed app clipped-right>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only mr-4">JustCook</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat dark @click="navigateTo({name:'lobby'})">
            <v-icon large color="white">library_books</v-icon><span>Recettes</span>
            </v-btn>
            <v-btn flat dark @click="navigateTo({name:'Recherche'})">
            <v-icon large color="white">search</v-icon><span class="hidden-xs-only"> Rechercher</span>
            </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer enable-resize-watcher fixed v-model="drawer" :stateless="left" app>
      <v-list dense>
        <v-container fluid>
          <v-btn flat @click="logout">
            <v-icon large color="red accent-2">power_settings_new</v-icon>Deconnexion
          </v-btn>
          <hr class="hroi">
          <div class="pushDown">
            <div class="profilName">
              <h2>Mon Profil</h2>
              <v-avatar size="100px" class="purple darken-4">
                <v-btn flat dark>
                  <v-icon class="purple darken-4" x-large dark>account_circle</v-icon>
                </v-btn>
              </v-avatar>
              <div class="sep">
              </div>
            </div>
          </div>
          <div class="pushDown2">
            <p class="pr-3">
              <v-icon large left color="purple darken-4">brightness_4</v-icon> Mode Nuit</p>
            <v-switch color="purple darken-4" v-model="isDarkTheme">
            </v-switch>
          </div>
        </v-container>
      </v-list>
     </v-navigation-drawer>
    </v-layout> <!-- Drawer End -->

    <h1 class="mt-5">Recettes</h1>
    <v-content>
  <v-container>
    <v-layout>
     <v-flex >
      <v-card>
         <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex class="elevation-2" xs12 md6 lg4 v-for="recipe in recipes" :key="recipe.id">
           <v-card-media :src="recipe.image" height="200px">
           </v-card-media>
           <v-card-title primary-title>
              <v-flex align-center justify-center >
                <h3 class="headline mb-0">{{recipe.title}}</h3>
                </v-flex>
                </v-card-title>
                <v-layout justify-center>
                  <div>{{recipe.description}}</div>
                </v-layout>
            <v-card-actions>
             <v-btn flat @click="navigateTo({name:'recipe', params: {recipeId: recipe.id}})" color="purple lighten-1">Voir la recette</v-btn>
             <v-spacer></v-spacer>
            <v-bottom-sheet v-model="sheet">
      <v-btn flat slot="activator" color="purple" dark> <v-icon>share</v-icon></v-btn>
      <v-list>
        <v-subheader>Partager sur</v-subheader>
        <v-list-tile
          v-for="tile in tiles"
          :key="tile.title"
          @click="sheet = false"
        >
          <v-list-tile-avatar>
            <v-avatar size="32px" tile>
              <img :src="`/static/doc-images/bottom-sheets/${tile.img}`" :alt="tile.title">
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-title>{{ tile.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>
            </v-card-actions>
            </v-flex>
         </v-layout>
        </v-container>
      </v-card>
    </v-flex>
   </v-layout>
  </v-container>
  </v-content>
  <v-btn flat  :disabled="getNull" @click="navigateTo({name:'recipe-create'})" v-if="isUserLoggedIn"> <v-icon left large color="purple darken-4"> add_circle</v-icon> Créer une Recette</v-btn>
  <v-flex align-center justify-center lg4 offset-lg4>
   <v-alert
      :value="alert"
      type="error"
      outline
      transition="scale-transition"
      v-if="!isUserLoggedIn"
    >
      Vous devez être connecté pour créer une Recette
    </v-alert>
    </v-flex>
  </div>
</template>

<script>
  import RecipeService from '@/services/RecipeService'
  import {mapState} from 'vuex'

  export default {
    data () {
      return {
        recipes: null,
        drawer: false,
        left: null,
        alert: true,
        sheet: false,
        tiles: [
        { img: 'gmail.png', title: 'Gmail' },
        { img: 'facebook.png', title: 'Facebook' },
        { img: 'hangouts.png', title: 'Hangouts' },
        { img: 'messenger.png', title: 'Messenger' },
        { img: 'twitter.png', title: 'Twitter' }
        ]
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('setToken', null)
        this.$store.dispatch('setUser', null)
        this.$session.destroy()
        this.$router.push({
          name: 'login'
        })
        this.$store.commit('setDark', false)
      },
      navigateTo (route) {
        this.$router.push(route)
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn'
      ]),
      isDarkTheme: {
        get () {
          return this.$store.getters.isDark
        },
        set (newValue) {
          this.$store.commit('setDark', newValue)
        }
      },
      getNull () {
        console.log(JSON.stringify(this.recipes, null, 2))
      }
    },
    async mounted () {
      this.recipes = (await RecipeService.index()).data
    },
    props: {
      source: String
    },
    components: {
    }
  }
</script>
<style scoped>
  .pushDown {
    margin-top: 125px;
  }

  .pushDown2 {
    margin-top: 230px;
    padding-left: 50px;
    display: flex;
  }

  .hroi {
    margin-top: 20px;
  }

  .sep {
    margin-top: 20px;
    font-size: 1em;
  }

  .sep1 {
    margin-top: 5px;
    font-size: 1em;
  }

  .rouge {
    color: red;
  }

h1{
  color: rgb(112, 111, 111)
}

</style>


