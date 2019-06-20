<template>
  <div class="home">
    <!-- Listens for event from the navbar component for when the renderArticles and clearArticles methods are callsed -->
    <Navbar @render='renderArticles' @clear='clearArticles'></Navbar>
    <v-container class="my-5">
      <v-layout wrap>
        <!-- Loop that displays the card for each article -->
        <v-flex xs12 xm6 class="mb-5" v-for="article in articles" :key="article.title">
          <v-card v-if="article.saved === false"> <!-- does not display any article set as saved -->
            <v-img :src="article.img" height="200" width="400"></v-img>

            <v-card-title primary-title>
              <div>
                <div class="headline">{{ article.title}}</div>
                <span class="grey--text">{{ article.desc }}</span>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat :href="article.url" color="blue" target="_blank"><v-icon class="mr-1">open_in_browser</v-icon>Open</v-btn>
              <v-btn @click="saveArticle(article._id)" flat color="green"><v-icon class="mr-1">save</v-icon>Save</v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="deleteArticle(article._id)" flat color="red"><v-icon class="mr-1">clear</v-icon>Delete</v-btn>
            </v-card-actions>
               
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import axios from "axios";
export default {
  name: "Home",
  components: {
    Navbar
  },
  // Renders article when the component loads
  mounted() {
    this.renderArticles();
  },
  data() {
    return {
      articles: [],  
    };
  },
  methods: {
        // Method to pull articles from DB and render them on the page
        renderArticles: function() {
          var art = this;
          this.articles = [];
          axios
            .get("/api/articles", function(response) {})
            .then(function(response) {
              console.log(response);
              art.articles = art.articles.concat(response.data);
            })
            .catch(function(err) {
              console.log(err);
            });
        },
        // Clears the articles array
        clearArticles: function() {
          this.articles = [];
        },
        // Method to set an article's save state to TRUE
        saveArticle: function(articleid, event) {
          axios.put("/api/saveArticle/"+articleid, function(response) {})
          .then(function(response) {
            console.log("This was saved: " + JSON.stringify(response));
          })
          .catch(function(err) {
            console.log(err);
          })
          setTimeout(() => this.renderArticles(), 1000);
        },
        // Method to delete the specific article
        deleteArticle: function(articleid, event) {
          axios.delete("/api/deleteArticle/"+articleid, function(response) {})
          .then(function(response) {
            console.log("This was deleted: " + JSON.stringify(response));
          })
          .catch(function(err) {
            console.log(err);
          })
          // When deleting an article, it would still be visible if the page was re-rendered
          // too quickly.  Added a timeout of 1 second to give DB time to remove
          setTimeout(() => this.renderArticles(), 1000);
        }
      }
};
</script>

<style>

.container {
  max-width: 900px;
}
</style>
