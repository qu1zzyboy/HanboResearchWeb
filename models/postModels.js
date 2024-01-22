const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "Post must have tile"]
    },
    body: {
        type: String,
        required: [true, "Post must have body"]
    },
    content: {
        type: String,
        require: [true, "Post must have content"]
    }
})
const postSchema2 = new mongoose.Schema({
    User_id: {
        type: Number,
        require: [true]
    }
})
const Post1 = mongoose.model("Post", postSchema);
module.exports = Post1;