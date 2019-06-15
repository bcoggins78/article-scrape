var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true
  },
  url: {
      type: String,
      required: true
  },
  img: {
      type: String,
      required: true
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});


var Article = mongoose.model("Article", ArticleSchema);


module.exports = Article;