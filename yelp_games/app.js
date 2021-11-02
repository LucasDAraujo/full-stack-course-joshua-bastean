/* ------------------------------ CONFIG IMPORT ----------------------------- */
const config = require("./config");

/* ------------------------------- NPM IMPORTS ------------------------------ */
const mongoose = require("mongoose");

//Connect to DB
mongoose.connect(config.database.connection());
const express = require("express");
const app = express();
const port = 3000;

/* ------------------------------ ROUTE IMPORTS ----------------------------- */
const gameRoutes = require("./routes/games");
const commentRoutes = require("./routes/comments");
const mainRoutes = require("./routes/main");

/* ----------------------------- MODEL IMPORTS ----------------------------- */
const Game = require("./models/game");
const Comment = require("./models/comment");

/* ----------------------- OTHER CONFIGURATIONS OF APP ---------------------- */
// 1 - Set ejs
// 2- Make the public folder visible
// 3 - Set urlEnconded from express true
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
    express.urlencoded({
        extended: true,
    })
);

/* ------------------------------- USING ROUTES ------------------------------- */
app.use("/games",gameRoutes);
app.use("/games/:id/comments",commentRoutes);

//MAIN ROUTES(WITH 404 ROUTE!)
app.use("/",mainRoutes);

/* --------------------------------- LISTEN --------------------------------- */
app.listen(port, () => console.log(`Yelp_games is working on port ${port}`));
