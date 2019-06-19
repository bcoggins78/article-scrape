<template>
  <div class="navbar">
    <v-toolbar color="light-blue darken-4" dark>
      <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>Space.com Mongo Scraper</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">

        <v-btn flat class="mr-4" @click="goHome">
          <v-icon class="mr-1">home</v-icon>Home
        </v-btn>

        <v-btn flat class="mr-4" @click="goSaved">
          <v-icon class="mr-1">save</v-icon>Saved Articles
        </v-btn>

        <v-btn flat class="mr-4" @click="scrape">
          <v-icon class="mr-1">get_app</v-icon>Scrape New Articles!
        </v-btn>

        <v-btn flat class="mr-4" @click="clearArticles">
          <v-icon class="mr-1">delete_forever</v-icon>Clear Articles
        </v-btn>

      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Navbar",
  methods: {
    scrape: function() {
      axios.get("/scrape").then(
        function(response) {
          console.log("Scraping Complete");
        }.bind(this)
      );
      setTimeout(() => this.$emit('render'), 1500);
    },
    clearArticles: function() {
      axios.delete("/api/deleteArticles").then(
        function(response) {
          console.log("Articles Cleared");
        }.bind(this)
      );
      this.$emit('clear')
    },
    goSaved: function() {
      this.$router.push('/saved');
    },
    goHome: function() {
      this.$router.push('/');
    }
  }
};
</script>

