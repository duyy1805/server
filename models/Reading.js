const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title1: {
        type: Number,
        required: true,
    },
    page: {
        type: Number,
    },
});

module.exports = mongoose.model("posts", PostSchema);
