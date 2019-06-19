<template>
  <v-app class="app">
    <router-view/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      
    }
  }
}
</script>

<style>

/* Styling for background image */
.home, .saved{
  background-image: url("./assets/sunrise.jpg");
  background-size: cover;
  min-height: 100vh;
  background-attachment: fixed;
}
</style>
