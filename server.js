const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(logger("dev"));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sample API
app.get('/api/test', function(req, res) {
  res.json({ greeting: 'Welcome to your Vue App' });
});

var routes = require("./routes/api-routes.js");
app.use(routes);

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";
console.log(MONGODB_URI)
mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

module.exports = routes;
