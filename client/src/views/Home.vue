<template>
  <div class="home">
    <Navbar @render='renderArticles' @clear='clearArticles'></Navbar>
    <v-container align-content-center class="my-5">
      <v-layout row wrap>
        <v-flex v-for="article in articles" :key="article.title">
          <v-card>
            <v-img :src="article.img" height="200" width="400"></v-img>

            <v-card-title primary-title>
              <div>
                <div class="headline">{{ article.title}}</div>
                <span class="grey--text">{{ article.desc }}</span>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat :href="article.url" target="_blank">Open Article</v-btn>
              <v-btn @click="saveArticle" flat color="green">Save Article</v-btn>
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
          // axios.put("/api/saveArticle/:id")
          console.log(this.articles._id)
        }
      }
};
</script>

