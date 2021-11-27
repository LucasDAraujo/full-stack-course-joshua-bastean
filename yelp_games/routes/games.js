const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const Comment = require("../models/comment");
const isLoggedIn = require("../utils/isLoggedIn");
const checkGameOwner = require("../utils/checkGameOwner");
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
    };

    console.log(newGame);

    //POST it on the Database
    try {
        const game = await Game.create(newGame);
        console.log(game);
        res.redirect(`/games/${game._id}`);
    } catch (err) {
        console.log(err);
        res.send(`ERROR ON /games POST:${err}`);
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
router.get("/genre/:genreName", async (req, res) => {
    //Check if the given genre is valid
    const validGenres = [];
    //If yes, continued
    //If no, send an error
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
        res.redirect(`/games/${id}`);
    } catch (err) {
        console.log(err);
        res.send(`ERROR on /games/${id}/edit UPDATE`);
    }
});

/* ------------------------------ ANCHOR DELETE ----------------------------- */
router.delete("/:id", checkGameOwner, async (req, res) => {
    //If owner, then delete
    try {
        deletedGame = await Game.findByIdAndDelete(req.params.id).exec();
        console.log(`Deleted:${deletedGame}`);
        res.redirect("/games");
    } catch (err) {
        res.send(`ERROR on /games/${req.params.id} DELETE`);
    }
});




module.exports = router;
