var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  
  title: {
    type: String,
    required: true,
    unique: true
  },
  // `link` is required and of type String
  // url: {
  //   type: String,
  //   required: true
  // },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }


  // title: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  // desc: {
  //   type: String,
  //   required: true
  // },
  // url: {
  //     type: String,
  //     required: true
  // },
  // img: {
  //     type: String,
  //     required: true
  // },
  // saved: {
  //     type: Boolean,
  //     default: false
  // },
  // comment: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Comment"
  // }
});


var Article = mongoose.model("Article", ArticleSchema);


module.exports = Article;