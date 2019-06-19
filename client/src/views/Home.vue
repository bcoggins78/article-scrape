<template>
  <div class="home">
    <Navbar @render='renderArticles' @clear='clearArticles'></Navbar>
    <v-container class="my-5">
      <v-layout wrap>
        <v-flex xs12 xm6 class="mb-5" v-for="article in articles" :key="article.title">
          <v-card v-if="article.saved === false">
            <v-img :src="article.img" height="200" width="400"></v-img>

            <v-card-title primary-title>
              <div>
                <div class="headline">{{ article.title}}</div>
                <span class="grey--text">{{ article.desc }}</span>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat :href="article.url" color="blue" target="_blank"><v-icon class="mr-1">open_in_browser</v-icon>Open Article</v-btn>
              <v-btn @click="saveArticle(article._id)" flat color="green"><v-icon class="mr-1">save</v-icon>  Save Article</v-btn>
              <v-btn @click="deleteArticle(article._id)" flat color="red"><v-icon class="mr-1">clear</v-icon>Delete Article</v-btn>
              <v-spacer></v-spacer>
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
  mounted() {
    this.renderArticles();
  },
  data() {
    return {
      articles: [],  
    };
  },
  methods: {
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
        clearArticles: function() {
          this.articles = [];
        },
        saveArticle: function(articleid, event) {
          axios.put("/api/saveArticle/"+articleid, function(response) {})
          .then(function(response) {
            console.log(articleid);
            console.log(JSON.stringify(response));
            
          })
          .catch(function(err) {
            console.log(err);
          })
          this.renderArticles()
        },
        deleteArticle: function(articleid, event) {
          axios.delete("/api/deleteArticle/"+articleid, function(response) {})
          .then(function(response) {
            console.log(articleid);
            console.log(JSON.stringify(response));
            
          })
          .catch(function(err) {
            console.log(err);
          })
          this.renderArticles()
        }
      },
      computed: {
        renderSaved: function() {
          return this.articles.filter(function(u) {
            return u.saved
          })
        }
      }
};
</script>

<style>
.container {
  max-width: 900px;
}
</style>
