const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    username : {
        type: String,
        require: true,
        unique: true
    },
    password : {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    title1: {
        type: String,
        require: true
    },
      title2: {
        type: String,
        require: true
    },
    id:{
      type: String,
      require: true
  },
      rating:{
        type: String,
        require: true
    },
      language: {
        type: String,
        require: true
    },
      description:{
        type: String,
        require: true
    },
      uri:{
        type: String,
        require: true
    },
})

module.exports = mongoose.model('users',UserSchema)