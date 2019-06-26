<template>
  <div class="saved">
    <Navbar></Navbar>
    <v-container class="my-5">
      <v-layout wrap>
        <!-- loop for displaying a card for each article -->
        <v-flex xs12 xm6 class="mt-5" v-for="article in articles" :key="article._id">
          <v-card>
            <v-img :src="article.img" height="200" width="400"></v-img>
            <v-card-title primary-title>
              <div>
                <div class="headline">{{ article.title}}</div>
                <span class="grey--text">{{ article.desc }}</span>
              </div>
            </v-card-title>
            <!-- Form to submit the comment to the DB -->
            <form @submit.prevent="addComment(article._id, form.comment)">
              <v-card-actions>
                <v-btn flat :href="article.url" color="blue" target="_blank">
                  <v-icon class="mr-1">open_in_browser</v-icon>Open
                </v-btn>
                <v-btn type="submit" flat color="purple">
                  <v-icon class="mr-1">assignment</v-icon>Add Comment
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn @click="deleteArticle(article._id)" flat color="red">
                  <v-icon class="mr-1">clear</v-icon>Delete
                </v-btn>
              </v-card-actions>
              <v-card-title>
                <div class="comment-form">
                    <v-textarea
                      class="comment-input"
                      v-model="form.comment"
                      prepend-inner-icon="create"
                      label="Type Comment Here..."
                      required
                      auto-grow
                      solo
                    ></v-textarea>
                  <h3>Comment</h3>
                </div>
              </v-card-title>
              <v-card-title>
                <div class="comment-text">
                  <!-- <h3>Comment</h3> -->
                  <div class = "comment-seperator" v-if="article.comment">{{ article.comment.body }}</div>
                  <div class = "comment-seperator" v-else>No Comments Added                              </div>
                </div>
              </v-card-title>
            </form>
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
        comment: ""
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
      console.log(
        "The add comment button was clicked, Article ID is:" +
          articleid +
          " Comment: " +
          this.form.comment
      );
      // Placeholder method that would add the comment to each associated article
      let comment = this.form.comment;
      axios
        .post("/api/addComment/" + articleid, { body: comment })
        .then(function(response) {
          console.log("This comment was saved: " + JSON.stringify(comment));
        })
        .catch(function(err) {
          console.log(err);
        });
      setTimeout(() => this.renderSavedArticles(), 1000);
      this.form.comment = "";
    }
  }
};
</script>

<style scoped>

.comment-form {
  border-bottom: solid black 2px;
  width: 100%
}

.comment-text {
  margin-bottom: 15px;
}

</style>

