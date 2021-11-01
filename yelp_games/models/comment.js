const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: String,
    text: String,
    //Makes the relation with the game and the comment
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
    },
});

module.exports = mongoose.model("Comment", commentSchema);
