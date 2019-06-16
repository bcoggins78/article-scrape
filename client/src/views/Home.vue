<template>
  <div class="home">
    <v-container align-content-center class="my-5">
      <v-layout row wrap>
        <v-flex v-for="article in articles" :key="article.title">
          <v-card>
            <v-img :src="article.img" height=200 width=400></v-img>

            <v-card-title primary-title>
              <div>
                <div class="headline">{{ article.title}}</div>
                <span class="grey--text">{{ article.desc }}</span>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat :href="article.url" target="_blank">Go to Article</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Home",
  mounted() {
    
    var art = this
    axios.get("/articles", function(response) {
          })
          .then(function(response) {
            console.log(response);
            art.articles = art.articles.concat(response.data);            
          }).catch(function(err){
            console.log(err);
          })
    
  },
  data() {
    return {
      articles: [],
      show: false,
      methods: {
        
      }
    }
  }
};
</script>

