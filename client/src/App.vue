<template>
    <v-app id="app" ref="inspire" :dark="isDark">
      <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
       <link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet">
      <page-header></page-header>
        <main>
          <v-container>
            <transition name="fade" mode="out-in">
            <router-view/>
            </transition>
          </v-container>
       </main>
   <page-footer></page-footer>
</v-app>
</template>

<script>
import PageHeader from '@/components/Header.vue'
import PageFooter from '@/components/Footer.vue'

export default {
  name: 'app',
  data () {
    return {
      value: true
    }
  },
  components: {
    PageHeader,
    PageFooter
  },

  computed: {
    isDark () {
      return this.$store.getters.isDark
    }
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

  .fade-enter-active, .fade-leave-active {
        transition-property: opacity;
        transition-duration: 0.25s;
    }


    .fade-enter, .fade-leave-active {
        opacity: 0
    }

</style>
