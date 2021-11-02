/* ------------------------------ CONFIG IMPORT ----------------------------- */
const config = require("./config");

/* ------------------------------- NPM IMPORTS ------------------------------ */
const mongoose = require("mongoose");
//Connect to DB
mongoose.connect(config.database.connection());
const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");

/* ------------------------------ ROUTE IMPORTS ----------------------------- */
const gameRoutes = require("./routes/games");
const commentRoutes = require("./routes/comments");
const mainRoutes = require("./routes/main");

/* ----------------------------- MODEL IMPORTS ----------------------------- */
const Game = require("./models/game");
const Comment = require("./models/comment");

/* ----------------------- OTHER CONFIGURATIONS ---------------------- */

app.set("view engine", "ejs"); // 1 - Set ejs
app.use(express.static("public")); // 2- Make the public folder visible
app.use(
    // 3 - Set urlEnconded from express true
    express.urlencoded({
        extended: true,
    })
);
app.use(methodOverride("_method")); // 4 - Set method-override

/* ------------------------------- USING ROUTES ------------------------------- */
app.use("/games", gameRoutes);
app.use("/games/:id/comments", commentRoutes);

//MAIN ROUTES(WITH 404 ROUTE!)
app.use("/", mainRoutes);

/* --------------------------------- LISTEN --------------------------------- */
app.listen(port, () => console.log(`Yelp_games is working on port ${port}`));
