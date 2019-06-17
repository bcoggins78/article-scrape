<template>
  <div class="home">
    <Navbar></Navbar>
    <v-container align-content-center class="my-5">
      <v-layout row wrap>
        <v-flex v-for="article in articles" :key="article._id">
          <v-card v-if="article.saved">
            <v-img :src="article.img" height="200" width="400"></v-img>

            <v-card-title primary-title>
              <div>
                <div class="headline">{{ article.title}}</div>
                <span class="grey--text">{{ article.desc }}</span>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat :href="article.url" target="_blank">Open Article</v-btn>
              <v-btn flat>Delete Article</v-btn>
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
    let art = this;
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
  data() {
    return {
      articles: [],
      methods: {
        renderArticls: function() {
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
            console.log("Articles Rendered")
        },
        clearArticles: function() {
          console.log("clearArticles is being called in Home")
          this.articles = [];
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
  }
};
</script>

