const express = require("express");
const router = express.Router({ mergeParams: true });
const Comment = require("../models/comment");

// We're going to render a page passing in the game ID
// NEW COMMENTS -> SHOW FORM
router.get("/new", (req, res) => {
    res.render("comments_new", { gameId: req.params.id });
});

// Create comments  - Actually update DATABASE
router.post("/", (req, res) => {
    // Create the comment
    Comment.create({
        ...req.body,
    })
        .then((newComment) => {
            res.redirect(`/games/${req.body.gameId}`);
        })
        .catch((err) => {
            console.log(err);
            res.redirect(`/games/${req.body.gameId}`);
        });
});

module.exports = router;
