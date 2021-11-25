const express = require("express");
const router = express.Router({ mergeParams: true });
const Game = require("../models/game");
const Comment = require("../models/comment");

// We're going to render a page passing in the game ID
// NEW COMMENTS -> SHOW FORM
router.get("/new", (req, res) => {
    res.render("comments_new", { gameId: req.params.id });
});

// ANCHOR CREATE comments  - Actually update DATABASE
router.post("/", async (req, res) => {
    // Create the comment
    try {
        const newComment = await Comment.create({
            user: { id: req.user._id, username: req.user.username },
            text: req.body.text,
            gameId: req.body.gameId,
        });
        console.log(newComment);
        res.redirect(`/games/${req.body.gameId}`);
    } catch (err) {
        console.log(err);
        res.send(`ERROR ON: /games/${req.body.gameId} POST comments`);
    }
});

//ANCHOR EDIT - Show the edit form
router.get("/:commentId/edit", async (req, res) => {
    try {
        const game = await Game.findById(req.params.id).exec();
        const comment = await Comment.findById(req.params.commentId).exec();
        res.render("comments_edit", { game, comment });
    } catch (err) {
        console.log("ERROR HERE: " + err);
        res.send(`ERROR ON: /:commentId/edit GET comments`);
    }
});

//ANCHOR UPDATE Comment - actually update the db
router.put("/:commentId", async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            { text: req.body.text },
            { new: true }
        );
        res.redirect(`/games/${req.params.id}`);
    } catch (err) {
        console.log(err);
        res.send("ERROR ON: /:commentId PUT");
    }
});

//ANCHOR DELETE Comment
router.delete("/:commentId", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        res.redirect(`/games/${req.params.id}`);
    } catch (err) {
        console.log("ERROR:" + err);
        res.send("ERROR: /commentId DELETE: <br>" + err);
    }
});
module.exports = router;
