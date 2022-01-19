const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const Comment = require("../models/comment");
const isLoggedIn = require("../utils/isLoggedIn");
const checkGameOwner = require("../utils/checkGameOwner");
const convertUserSearch = require("../utils/convertUserSearch");
const validGenres = require("../utils/validGenres");
/* ------------------------------ ANCHOR INDEX ------------------------------ */
router.get("/", async (req, res) => {
    console.log(req.user);
    try {
        const games = await Game.find().exec();
        //This is going to change later
        res.render("games", { games, user: req.user });
    } catch (err) {
        console.log(err);
        res.send(`ERROR:${err}`);
    }
});

/* ------------------------------ ANCHOR CREATE ----------------------------- */
router.post("/", isLoggedIn, async (req, res) => {
    //Lower case and spaces

    //Create a new game
    const newGame = {
        ...req.body,
        owner: { id: req.user._id, username: req.user.username },
        upvotes: [req.user.username],
        downvotes: [],
    };

    console.log(newGame);

    //POST it on the Database
    try {
        const game = await Game.create(newGame);
        req.flash("success", "Your game has been created!");
        res.redirect(`/games/${game._id}`);
    } catch (err) {
        req.flash("error", "Cannot create the game");
        res.redirect("/games");
    }
});

/* ------------------------------- ANCHOR NEW ------------------------------- */
router.get("/new", isLoggedIn, (req, res) => {
    res.render("games_new");
});

/* ------------------------------ ANCHOR SEARCH ----------------------------- */
router.get("/search", async (req, res) => {
    try {
        const games = await Game.find({
            $text: {
                $search: req.query.term,
            },
        });
        res.render("games", { games });
    } catch (err) {
        console.log(err);
        res.send("Broken search");
    }
});

/* ------------------------------ ANCHOR GENRE ------------------------------ */
router.get("/genre/:genre", async (req, res) => {
    const userSearch = req.params.genre.toLowerCase().replace(" ", "");

    //Check if the given genre is valid
    if (validGenres.includes(userSearch)) {
        const games = await Game.find({
            genre: convertUserSearch(userSearch),
        }).exec();
        res.render("games", { games });
    } else {
        res.send("Please enter a valid genre");
    }
});
/* ---------------------------- ANCHOR VOTE ROUTE --------------------------- */
router.post("/vote", isLoggedIn, async (req, res) => {
    console.log(req.body);
    const game = await Game.findById(req.body.gameId);
    const alreadyUpvoted = game.upvotes.indexOf(req.user.username); //Will be -1 if not found
    const alreadyDownvoted = game.downvotes.indexOf(req.user.username); //Will be -1 if not found

    let response = {};
    //Voting logic
    if (alreadyUpvoted === -1 && alreadyDownvoted === -1) {
        //Has not voted
        if (req.body.voteType === "up") {
            //Upvoting
            game.upvotes.push(req.user.username);
            game.save();
            response = { message: "Upvote tallied!", code: 1 };
        } else if (req.body.voteType === "down") {
            //Downvoting
            game.downvotes.push(req.user.username);
            game.save();
            response = { message: "Downvote tallied!", code: -1 };
        } else {
            //Error
            response = { message: "Error 1", code: "err" };
        }
    } else if (alreadyUpvoted >= 0) {
        //Already upvoted
        if (req.body.voteType === "up") {
            game.upvotes.splice(alreadyUpvoted, 1);
            game.save();
            response = { message: "upvote removed", code: 0 };
        } else if (req.body.voteType === "down") {
            game.upvotes.splice(alreadyUpvoted, 1);
            game.downvotes.push(req.user.username);
            game.save();
            response = { message: "Change to downvote", code: -1 };
        } else {
            //Error
            response = { message: "Error 2", code: "err" };
        }
    } else if (alreadyDownvoted >= 0) {
        //Already downvoted
        if (req.body.voteType === "up") {
            game.downvotes.splice(alreadyDownvoted, 1);
            game.upvotes.push(req.user.username);
            game.save();
            response = { message: "Changed to upvote", code: 1 };
        } else if (req.body.voteType === "down") {
            game.downvotes.splice(alreadyDownvoted, 1);
            game.save();
            response = { message: "Removed downvote", code: 0 };
        } else {
            //Error
            response = { message: "Error 3", code: "err" };
        }
    } else {
        //Error
        response = { message: "Error 4", code: "err" };
    }
    // Update score
    response.score = game.upvotes.length - game.downvotes.length;
    res.json(response);
});

/* ------------------------------- ANCHOR SHOW ------------------------------ */
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const game = await Game.findById(id).exec();
        const comments = await Comment.find({ gameId: id });
        res.render("games_show", { game, comments });
    } catch (err) {
        console.log(`ERROR ON /games/${id} <br> SHOW ${err}`);
    }
});

/* ------------------------------- ANCHOR EDIT ------------------------------ */
router.get("/:id/edit", checkGameOwner, async (req, res) => {
    //If owner, then render the form to edit
    const game = await Game.findById(req.params.id).exec();
    res.render("games_edit", { game });
});

/* ------------------------------ ANCHOR UPDATE ----------------------------- */
router.put("/:id", checkGameOwner, async (req, res) => {
    const id = req.params.id;

    //If owner, then update
    try {
        const game = {
            ...req.body,
            owner: { id: req.user._id, username: req.user.username },
        };
        const updatedGame = await Game.findByIdAndUpdate(id, game, {
            new: true,
        }).exec();
        console.log(updatedGame);
        req.flash("success", "Game updated!");
        res.redirect(`/games/${id}`);
    } catch (err) {
        console.log(err);
        req.flash("error", "Error updating game");
        res.send(`ERROR on /games/${id}/edit UPDATE`);
    }
});

/* ------------------------------ ANCHOR DELETE ----------------------------- */
router.delete("/:id", checkGameOwner, async (req, res) => {
    //If owner, then delete
    try {
        deletedGame = await Game.findByIdAndDelete(req.params.id).exec();
        console.log(`Deleted:${deletedGame}`);
        req.flash("success", "Game deleted!");
        res.redirect("/games");
    } catch (err) {
        req.flash("error", "Error deleting game");
        res.redirect("back");
    }
});

module.exports = router;
