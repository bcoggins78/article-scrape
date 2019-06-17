const db = require("../models");
const cheerio = require("cheerio");
const axios = require("axios");
var express = require("express")
var router = express.Router();



    // Scrapte the gamespot website and add articles to MongoDB
    router.get("/scrape", function (req, res) {

        axios.get("https://www.gamespot.com/news/").then(function (response) {
            var $ = cheerio.load(response.data);

            $("article.media-article").each(function (i, element) {

                var result = {};

                result.title = $(this).find("h3.media-title").text();
                result.url = "https://www.gamespot.com" + $(this).children("a").attr("href");
                result.desc = $(this).find(".media-deck").text();
                result.img = $(this).find("img").attr("src");

                db.Article.create(result)
                    .then(function (dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });                    
            });
            res.send("Scrape Complete");
        });
    });

    // Retrieve articles from MongoDB
    router.get("/api/articles", function(req, res) {

        db.Article.find({})
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    router.delete('/api/deleteArticles', (req, res) => {
        
        db.Article.deleteMany({ saved: false })
            .then(function(dbArticle) {
                res.json(dbArticle);
                console.log("Articles Cleared")
            })
            .catch(function(err) {
                res.json(err);
            });
      });

    router.put('/api/saveArticle/:id', (req, res) => {

        const id = req.params.id;

        db.Article.findOneAndUpdate({ _id: id }, { $set: { saved: true}}, { new: true })
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    router.post("/articles/:id", function(req, res) {
        // Create a new note and pass the req.body to the entry
        db.Comment.create(req.body)
          .then(function(dbComment) {
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
          })
          .then(function(dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
          });
      });

module.exports = router;
