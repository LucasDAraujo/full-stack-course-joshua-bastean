const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const Comment = require("../models/comment");

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
router.get("/:id/edit", isLoggedIn, async (req, res) => {
    const id = req.params.id;
    try {
        const game = await Game.findById(id).exec();
        game.genre = genreFix(game.genre);
        res.render("games_edit", { game });
    } catch (err) {
        console.log(`ERROR ON /games/${id}/edit <br> EDIT ${err}`);
    }
});

/* ------------------------------ ANCHOR UPDATE ----------------------------- */
router.put("/:id", isLoggedIn, async (req, res) => {
    const id = req.params.id;
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
router.delete("/:id", isLoggedIn, async (req, res) => {
    try {
        deletedGame = await Game.findByIdAndDelete(req.params.id).exec();
        console.log(`Deleted:${deletedGame}`);
        res.redirect("/games");
    } catch (err) {
        res.send(`ERROR on /games/${req.params.id} DELETE`);
    }
});

/* --------------------------- ANCHOR IS LOGGED IN -------------------------- */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}
function genreFix(genre) {
    return genre.toLowerCase().replace(" ", "");
}
module.exports = router;
