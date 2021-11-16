const express = require("express");
const router = express.Router();
const Game = require("../models/game");
const Comment = require("../models/comment");

const fixForm = (reqBody) => {
    reqBody.genre = reqBody.genre.toLowerCase().replace(" ", "");
    return reqBody;
};

/* ---------------------------------- //ANCHOR INDEX--------------------------------- */
router.get("/", async (req, res) => {
    try {
        const games = await Game.find().exec();
        //This is going to change later
        res.render("games", { games, user: req.user });
    } catch (err) {
        console.log(err);
        res.send(`ERROR:${err}`);
    }
});

/* --------------------------------- CREATE --------------------------------- */
router.post("/", async (req, res) => {
    const newGame = fixForm(req.body);

    try {
        const game = await Game.create(newGame);
        console.log(game);
        res.redirect(`/games/${game._id}`);
    } catch (err) {
        console.log(err);
        res.send(`ERROR ON /games POST:${err}`);
    }
});

/* ----------------------------------- NEW ---------------------------------- */
router.get("/new", (req, res) => {
    res.render("games_new");
});

/* ---------------------------------- SEARCH -------------------------------- */
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

/* ---------------------------------- SHOW ---------------------------------- */
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

/* ---------------------------------- EDIT ---------------------------------- */
router.get("/:id/edit", async (req, res) => {
    const id = req.params.id;
    try {
        const game = await Game.findById(id).exec();
        res.render("games_edit", { game });
    } catch (err) {
        console.log(`ERROR ON /games/${id}/edit <br> EDIT ${err}`);
    }
});

/* ---------------------------------//ANCHOR UPDATE --------------------------------- */
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const game = fixForm(req.body);
        const updatedGame = await Game.findByIdAndUpdate(id, game, {
            new: true,
        }).exec();
        console.log(updatedGame);
        res.redirect(`/games/${id}`);
    } catch (err) {
        res.send(`ERROR on /games/${id}/edit UPDATE`);
    }
});

/* --------------------------------- DELETE --------------------------------- */
router.delete("/:id", async (req, res) => {
    try {
        deletedGame = await Game.findByIdAndDelete(req.params.id).exec();
        console.log(`Deleted:${deletedGame}`);
        res.redirect("/games");
    } catch (err) {
        res.send(`ERROR on /games/${req.params.id} DELETE`);
    }
});
module.exports = router;
