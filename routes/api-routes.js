const db = require("../models");
const cheerio = require("cheerio");
const axios = require("axios");
var express = require("express")
var router = express.Router();



    router.get("/api/scrape/", function (req, res) {

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
                        res.send("Scrape Complete");
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });                    
            });
        });
    });

module.exports = router;
