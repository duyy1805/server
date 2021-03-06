const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const UserSchema = require("./User");
const BookSchema = new Schema({
    title1: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    rating: {
        type: Number,
        require: true,
    },
    language: {
      type: String,
      require: true
    },
    description:{
      type: String,
      require: true
    },
    image:{
      type: String,
      require: true
    },
    uri:{
      type: String,
      require: true
    },
    status:{
      type: Boolean,
      require: true
    },
    user:{
      type: Array,
    }
})

module.exports = mongoose.model("books", BookSchema);
