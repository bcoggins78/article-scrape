<template>
  <div class="saved">
    <Navbar></Navbar>
    <v-container class="my-5">
      <v-layout wrap>
        <!-- loop for displaying a card for each article -->
        <v-flex xs12 xm6 class="mt-5" v-for="article in articles" :key="article._id">
          <v-card v-if="article.saved">
            <!-- only shows the article if it is "Saved" -->
            <v-img :src="article.img" height="200" width="400"></v-img>

            <v-card-title primary-title>
              <div>
                <div class="headline">{{ article.title}}</div>
                <span class="grey--text">{{ article.desc }}</span>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat :href="article.url" color="blue" target="_blank">
                <v-icon class="mr-1">open_in_browser</v-icon>Open
              </v-btn>
              <v-btn @click="addComment(article._id)" flat color="purple">
                <v-icon class="mr-1">assignment</v-icon>Add Comment
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn @click="deleteArticle(article._id)" flat color="red">
                <v-icon class="mr-1">clear</v-icon>Delete
              </v-btn>
            </v-card-actions>
            <!-- This is a placeholder for the comments section, currently not emplemented.  Data from the comment would be included
            in the loop so any comments would appear on each article -->
            <v-card-title>
              <div>
                <form>
                  <v-text-field :counter="125" v-model="form.comments" label="Comments not available yet" required></v-text-field>
                </form>
                <h4>Comments Placeholder</h4>
                <div>Look again at that dot. That's here. That's home. That's us. On it everyone you love, everyone you know, 
                  everyone you ever heard of, every human being who ever was, lived out their lives. The aggregate of our joy 
                  and suffering, thousands of confident religions, ideologies, and economic doctrines, every hunter and forager, 
                  every hero and coward, every creator and destroyer of civilization, every king and peasant, every young couple 
                  in love, every mother and father, hopeful child, inventor and explorer, every teacher of morals, every corrupt 
                  politician, every "superstar," every "supreme leader," every saint and sinner in the history of our species lived 
                  there--on a mote of dust suspended in a sunbeam. -- Carl Sagan</div>
              </div>
            </v-card-title>
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
  // Renders the articles when the component loads
  mounted() {
    this.renderSavedArticles();
  },
  data() {
    return {
      articles: [], // Array to hold state for all articles
      form: {
        comment: ''
      }
    };
  },
  methods: {
    // Method to pull articles from DB and render them on the page
    renderSavedArticles: function() {
      this.articles = [];
      var art = this;
      axios
        .get("/api/savedArticles", function(response) {})
        .then(function(response) {
          console.log(response);
          art.articles = art.articles.concat(response.data);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // Clears the array of articles
    clearArticles: function() {
      this.articles = [];
    },
    // Deletes the specific article
    deleteArticle: function(articleid, event) {
      axios
        .delete("/api/deleteArticle/" + articleid, function(response) {})
        .then(function(response) {
          console.log("This was deleted: " + JSON.stringify(response));
        })
        .catch(function(err) {
          console.log(err);
        });
      // When deleting an article, it would still be visible if the page was re-rendered
      // too quickly.  Added a timeout of 1 second to give DB time to remove
      setTimeout(() => this.renderSavedArticles(), 1000);
    },
    addComment: function(articleid) {
      console.log("The add comment button was clicked, Article ID is:" + articleid)
      // Placeholder method that would add the comment to each associated article
    }
  }
};
</script>

