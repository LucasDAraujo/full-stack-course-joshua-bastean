const express = require("express");
const router = express.Router({ mergeParams: true });
const Game = require("../models/game");
const Comment = require("../models/comment");

// We're going to render a page passing in the game ID
// NEW COMMENTS -> SHOW FORM
router.get("/new", (req, res) => {
    res.render("comments_new", { gameId: req.params.id });
});

// Create comments  - Actually update DATABASE
router.post("/", async (req, res) => {
    // Create the comment
    try {
        const newComment = await Comment.create({
            ...req.body,
        });
        console.log(newComment);
        res.redirect(`/games/${req.body.gameId}`);
    } catch (err) {
        console.log(err);
        res.send(`ERROR ON: /games/${req.body.gameId} POST comments`);
    }
});

//EDIT - Show the edit form
router.get("/:commentId/edit", async (req, res) => {
    try {
        const game = await Game.findById(req.params.id).exec();
        const comment = await Comment.findById(req.params.commentId).exec();
        res.render("comments_edit", { game, comment });
        console.log(
            "🚀 ~ file: comments.js ~ line 30 ~ router.get ~ game",
            game
        );
        console.log(
            "🚀 ~ file: comments.js ~ line 32 ~ router.get ~ comment",
            comment
        );
    } catch (err) {
        console.log("ERROR HERE: " + err);
        res.send(`ERROR ON: /:commentId/edit GET comments`);
    }
});

//UPDATE Comment - actually update the db
router.put("/:commentId", async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            { text: req.body.text },
            { new: true }
        );
        console.log(
            "🚀 ~ file: comments.js ~ line 55 ~ router.put ~ updatedComment",
            updatedComment
        );
        res.redirect(`/games/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.send("ERROR ON: /:commentId PUT");
    }
});
//DELETE Comment
module.exports = router;
