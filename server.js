const express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var db = require("./models");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(logger("dev"));


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/api-routes.js");

// mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);

// Sample API
app.get('/api/test', function(req, res) {
  res.json({ greeting: 'Welcome to your Vue App' });
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
