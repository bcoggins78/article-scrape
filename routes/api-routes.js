const db = require("../models");
const cheerio = require("cheerio");
const axios = require("axios");
var mongoose = require("mongoose");
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

module.exports = function (app) {

    app.get("/scrape", function (req, res) {

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










    })


};