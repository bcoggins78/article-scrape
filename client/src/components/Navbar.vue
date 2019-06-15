<template>
  <div class="navbar">
    <v-toolbar color="light-blue darken-4" dark>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>Mongo Scraper</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-icon>save</v-icon>
        <v-btn flat class="mr-5">Saved Aricles</v-btn>
        <v-icon>get_app</v-icon>
        <v-btn flat class="mr-5">Scrape New Articles!</v-btn>
        <v-icon>delete_forever</v-icon>
        <v-btn flat class="mr-5">Clear Aricles</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

