<template>
<div>
<v-content class="mt-5">
  <v-container fluid grid-list-sm>
    <v-flex class="elevation-4 mb-4">
         Ingrédients
       </v-flex>
       <div class="ing">
         <ul>
           <li v-for="(ings, s) in arrings[0]" :key="s" >
        {{ arrings[0][s] }}
      </li>
         </ul>
       </div>
     <v-expansion-panel focusable class="mt-5">
    <v-expansion-panel-content class="pt-1" v-for="(item,i) in recipe.etapes" :key="i ">
      <div color="purple" slot="header">Etape {{ i + 1 }}</div>
      <v-card>
        <v-card-text> {{ descarr[0][i] }}</v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
     <v-layout row wrap class="pt-3">
       <v-flex class="elevation-4">
         TEXT
       </v-flex>
       <v-flex class="elevation-4">
         TEXT
       </v-flex>
     </v-layout>
   </v-container>
  <v-container fluid>
     <v-layout align-center justify-center>
       <v-flex xs12 sm12 md12 lg12>
         <v-card class="elevation-12">
           <v-toolbar flat dense class="purple darken-4" dark>
                  <v-toolbar-title>
                    <h3 class="headline mb-0">{{recipe.title}}</h3>
                  </v-toolbar-title>
                </v-toolbar>
              <v-container>
              <v-flex xs12>  
            <v-flex xs12 md12 lg12 class="elevation-4">
               <v-card-media :src="recipe.image" height="400px">
               </v-card-media>
             <v-card-text>
               <p> Difficulté: <v-icon color="red" v-for="i in recipe.difficulty" :key="i">star</v-icon> </p>
             </v-card-text>
             <v-card-text>
              <p> Catégorie: {{recipe.category}} </p> 
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
</template>
<script>
import RecipeService from '@/services/RecipeService'

export default {
  data () {
    return {
      drawer: false,
      left: null,
      recipe: {},
      arrings: [],
      descarr: []
    }
  },

  async mounted () {
    const recipeId = this.$store.state.route.params.recipeId
    this.recipe = (await RecipeService.show(recipeId)).data
    var re = /\s*;\s*/
    var splitIng = this.recipe.ingredients.split(re)
    var splStep = this.recipe.description.split(re)
    this.arrings.push(splitIng)
    this.descarr.push(splStep)
  },
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    }
  }
}
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
