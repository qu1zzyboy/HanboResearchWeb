const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is neccessary'],
        unique: true
    },
    password: {
        type: String,
        required: [true, "User must have password"],
    }
});

const postUser = mongoose.model("User", userSchema);
module.exports = postUser;