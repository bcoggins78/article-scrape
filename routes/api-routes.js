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
        
        db.Article.deleteMany({})
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
            })
    })

module.exports = router;
