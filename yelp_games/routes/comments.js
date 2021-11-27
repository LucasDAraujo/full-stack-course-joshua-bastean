const express = require("express");
const router = express.Router({ mergeParams: true });
const Game = require("../models/game");
const Comment = require("../models/comment");
const isLoggedIn = require("../utils/isLoggedIn");
const checkCommentOwner = require("../utils/checkCommentOwner");

// We're going to render a page passing in the game ID
// NEW COMMENTS -> SHOW FORM
router.get("/new", isLoggedIn, (req, res) => {
    res.render("comments_new", { gameId: req.params.id });
});

// ANCHOR CREATE comments  - Actually update DATABASE
router.post("/", isLoggedIn, async (req, res) => {
    // Create the comment
    try {
        const newComment = await Comment.create({
            user: { id: req.user._id, username: req.user.username },
            text: req.body.text,
            gameId: req.body.gameId,
        });
        req.flash("success", "Comment created successfully!");
        res.redirect(`/games/${req.body.gameId}`);
    } catch (err) {
        console.log(err);
        req.flash("error", "Error creating comment");
        res.redirect("/games");
    }
});

//ANCHOR EDIT - Show the edit form
router.get("/:commentId/edit", checkCommentOwner, async (req, res) => {
    try {
        const game = await Game.findById(req.params.id).exec();
        const comment = await Comment.findById(req.params.commentId).exec();
        res.render("comments_edit", { game, comment });
    } catch (err) {
        console.log(err);
        res.redirect("/games");
    }
});

//ANCHOR UPDATE Comment - actually update the db
router.put("/:commentId", checkCommentOwner, async (req, res) => {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.commentId,
            { text: req.body.text },
            { new: true }
        );
        req.flash("success", "Comment edited successfully!");
        res.redirect(`/games/${req.params.id}`);
    } catch (err) {
        console.log(err);
        req.flash("error", "Error editing comment");
        res.redirect("/games");
    }
});

//ANCHOR DELETE Comment
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        req.flash("success", "Comment deleted!");
        res.redirect(`/games/${req.params.id}`);
    } catch (err) {
        console.log("ERROR:" + err);
        req.flash("error", "Error deleting comment")
        res.redirect("/games");
    }
});

module.exports = router;
