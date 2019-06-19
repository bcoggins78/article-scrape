<template>
  <div class="home">
    <Navbar @render='renderArticles' @clear='clearArticles'></Navbar>
    <v-container class="my-5">
      <v-layout wrap>
        <v-flex xs12 xm6 class="mb-5" v-for="article in articles" :key="article.title">
          <v-card v-if="article.saved === false">
            <!-- <v-img :src="article.img" height="200" width="400"></v-img> -->
            <v-img src="https://static.gamespot.com/uploads/screen_small/1578/15787979/3549953-3689163597-34002.jpg" height="200" width="400"></v-img>

            <v-card-title primary-title>
              <div>
                <div class="headline">{{ article.title}}</div>
                <!-- <span class="grey--text">{{ article.desc }}</span> -->
                <span class="grey--text">Testing Testing 123</span>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat href="https://www.gamespot.com/articles/the-division-2-update-out-now-adds-new-gunner-spec/1100-6467876/" color="blue" target="_blank"><v-icon class="mr-1">open_in_browser</v-icon>Open Article</v-btn>
              <!-- <v-btn flat :href="article.url" color="blue" target="_blank"><v-icon class="mr-1">open_in_browser</v-icon>Open Article</v-btn> -->
              <v-btn @click="saveArticle" flat color="green"><v-icon class="mr-1">save</v-icon>  Save Article</v-btn>
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
        saveArticle: function() {
          axios.put("/api/saveArticle/:id", function(response) {})
          console.log(this.articles[0]._id)
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
