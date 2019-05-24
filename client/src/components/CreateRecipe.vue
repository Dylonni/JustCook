<template>
<div v-if="$store.state.isUserLoggedIn">
  <v-content class="mt-5">
  <v-container fluid grid-list-sm>
    <v-flex row wrap>
    <v-flex class="elevation-2">
         <v-dialog v-model="dialog" persistent max-width="450px">
        <v-btn flat slot="activator"> <v-icon left large color="purple darken-4"> add_circle</v-icon> Ajouter un Ingrédient </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Ingrédient</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs8>
                  <v-text-field v-model="quantity" color="purple darken-4" value="" label="Quantité"></v-text-field>
                  <v-select required v-model="mesured" label="Mesuré en"  color="purple darken-4" :items="['Kg','g','L','cl','ml']"></v-select>
                  <v-text-field @keyup.enter="dialog = false, addIngredient()" v-model="ingredient" label="Nom de l'ingrédient'" required color="purple darken-4"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small color="error"></small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-4" flat @click.native="dialog = false">Annuler</v-btn>
            <v-btn color="green" flat @click.native="dialog = false" @click="addIngredient">Créer</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <ul>
      <li v-for="(ings, s) in arr" :key="s" >
        {{ arr[s] }}
      </li>
      </ul>
       </v-flex>


  <v-btn flat :disabled="!validStep" color="success" class="mt-5" @click="recipe.etapes++"><v-icon>add</v-icon>Ajouter une étape</v-btn>
   <v-btn class="mt-5" :disabled="!noEntry" flat @click="removeStep"><v-icon color="red">undo</v-icon>Annuler</v-btn>
     <v-expansion-panel focusable popout class="elevation-3" v-model="recipe.etapes">
    <v-expansion-panel-content v-for="(item,i) in recipe.etapes" :key="i">
      <div color="purple" slot="header">Etape {{ i + 1}}</div>
      <v-card>
        <v-text-field :disabled="inputDisabled" @keyup.enter="addStep" v-model="etp" color="purple darken-4" label="Décrivez l'étape ici puis appuyez sur Entrer"></v-text-field>
        <p>{{ etparr[i] }}</p>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
     <v-layout row wrap class="pt-3">
       <v-flex class="elevation-2">
         TEXT
       </v-flex>
       <v-flex class="elevation-2">
         TEXT
       </v-flex>
     </v-layout>
     <v-btn block :disabled="!validForm" color="success" @click="create"> Créer <v-icon>done</v-icon></v-btn>
     </v-flex>
   </v-container>
  <v-container fluid>
     <v-layout align-center justify-center>
       <v-flex xs12 sm12 md12 lg12>
         <v-card class="elevation-10">
           <v-toolbar flat dense class="purple darken-4" dark height="75px">
                  <v-toolbar-title>
                    <h3 class="headline mb-0"><v-text-field color="white" label="Titre de la Recette" v-model="recipe.title"></v-text-field></h3>
                  </v-toolbar-title>
                </v-toolbar>
              <v-container>
              <v-flex xs12>
            <v-flex xs12 md12 lg12 class="">
               <v-card-media height="100px">
                   <v-text-field :disabled="stepIsOk" color="purple darken-4" required v-model="recipe.image" label="Url de l'image"></v-text-field>
               </v-card-media>
               <v-flex>
             <v-card-text>
               <v-select color="purple darken-4" v-model="recipe.difficulty" label="Difficulté de la recette" required :items="[1, 2, 3, 4, 5]"></v-select>
             </v-card-text>
             </v-flex>
             <v-card-text>
            <v-select color="purple darken-4" v-model="recipe.category" label="Catégorie" required :items="['Végétarien', 'Dessert', 'Plat', 'Boisson', 'Entrée',]"></v-select>
             </v-card-text>
            </v-flex>
           </v-flex>
        </v-container>
      </v-card>
    </v-flex>
   </v-layout>
  </v-container>
  </v-content>
</div>
<alert-page v-else></alert-page>
</template>
<script>
import RecipeService from '@/services/RecipeService'
import AlertPage from '@/components/Alert'

export default {
  data () {
    return {
      dialog: false,
      ingredient: null,
      mesured: null,
      currentIng: null,
      arr: [],
      validStep: false,
      etp: null,
      etparr: [],
      quantity: 0,
      recipe: {
        title: null,
        description: null,
        ingredients: null,
        etapes: 1,
        category: null,
        image: null,
        difficulty: null
      }
    }
  },
  methods: {
    async create () {
      try {
        console.log(JSON.stringify(this.recipe, null, 2))
        await RecipeService.post(this.recipe)
        this.$router.push({
          name: 'lobby'
        })
      } catch (err) {
        console.log(err)
      }
    },
    navigateTo (route) {
      this.$router.push(route)
    },
    addIngredient () {
      this.currentIng = this.quantity + this.mesured + ' de ' + this.ingredient
      this.arr.push(this.currentIng)
      var ing = this.arr.join(' ;')
      this.recipe.ingredients = ing
      console.log(this.recipe.ingredients + ' Ajouté')
    },
    addStep () {
      this.etparr.push(this.etp)
      var stp = this.etparr.join(' ;')
      this.recipe.description = stp
      console.log('Description: " ' + this.recipe.description)
      this.etp = null
      this.validStep = true
      console.log('etparr.length = ' + this.etparr.length)
    },
    removeStep () {
      if (this.etparr.length >= this.recipe.etapes) {
        var rmvLastEl = this.etparr.pop()
        console.log('Popped ' + rmvLastEl + ' from etparr')
        console.log(this.etparr)
      }
      if (this.recipe.etapes >= 2) {
        this.recipe.etapes --
        console.log('etparr.length = ' + this.etparr.length)
      }
    }
  },
  computed: {
    validForm () {
      return this.recipe.title !== null &&
      this.recipe.description !== null &&
      this.arr.length !== 0 &&
      this.recipe.etapes > 0 &&
      this.recipe.category !== null &&
      this.recipe.image !== null &&
      this.recipe.difficulty > 0
    },
    noEntry () {
      return this.recipe.etapes >= 2
    },
    stepIsOk () {
      if (this.etparr.length !== 0) {
        this.validStep = true
      } else {
        this.validStep = false
      }
      if (this.recipe.etapes === this.etparr.length) {
        this.validStep = true
      } else {
        this.validStep = false
      }
    },
    inputDisabled () {
      return console.log(this.recipe.etapes + ' ' + this.etparr.length) && this.recipe.etapes !== this.etparr.length
    }
  },
  components: {
    AlertPage
  }
}

// TODO : Griser l'input field (if this.recipe.etapes == this.etparr.length => ()) || Ne pas Supprimer de case if etparr.length < this.recipe.etapes
</script>
<style scoped>
p{
  font-size: 1.5rem
}

.ing{
  text-align: left;
  margin-left: 20px;
}
</style>
