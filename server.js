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

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Location of api routes
var routes = require("./routes/api-routes.js");
app.use(routes);

// MongoDB connection parameters
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";
mongoose.connect(MONGODB_URI);


app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

module.exports = routes;
