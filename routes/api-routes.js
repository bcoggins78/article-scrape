const db = require("../models");
const cheerio = require("cheerio");
const axios = require("axios");
var express = require("express")
var router = express.Router();

    // Scrape the space.com website and add articles to MongoDB
    router.get("/scrape", function (req, res) {

        axios.get("https://www.space.com/news").then(function (response) {
            var $ = cheerio.load(response.data);

            $("div.listingResult").each(function (i, element) {

                var result = {};

                result.title = $(this).find("h3.article-name").text();
                result.url = $(this).find("a").attr("href");
                result.desc = $(this).find(".synopsis").text();
                result.img = $(this).find("figure").attr("data-original");

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

    // Retrieve unsaved articles from MongoDB
    router.get("/api/unSavedArticles", function(req, res) {

        db.Article.find({ saved: false })
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    // Retrieve saved articles from MongoDB
    router.get("/api/savedArticles", function(req, res) {

        db.Article.find({ saved: true })
            .populate("comment")
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });
    
    // Route to delete all un-saved articles
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
    
    // Route to update Article saved status to true
    router.put('/api/saveArticle/:id', (req, res) => {

        let id = req.params.id;

        db.Article.findOneAndUpdate({ _id: id }, { $set: { saved: true}}, { new: true })
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

    // Route to create a new comment for a specific article
    router.post("/api/addComment/:id", function(req, res) {
        db.Comment.create(req.body)
          .then(function(dbComment) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
          })
          .then(function(dbArticle) {
            res.json(dbArticle);
          })
          .catch(function(err) {
            res.json(err);
          });
    });

    // Route to delete a specif article
    router.delete('/api/deleteArticle/:id', (req, res) => {

        let id = req.params.id;

        db.Article.findOneAndDelete({ _id: id })
            .then(function(dbArticle) {
                res.json(dbArticle);
            })
            .catch(function(err) {
                res.json(err);
            });
    });

module.exports = router;
