/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */

//- CONFIG IMPORT -
const config = require("./config");

//- NPM IMPORTS -
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const morgan = require("morgan");

//- ROUTE IMPORTS -
const gameRoutes = require("./routes/games");
const commentRoutes = require("./routes/comments");
const mainRoutes = require("./routes/main");

//- MODEL IMPORTS -
const Game = require("./models/game");
const Comment = require("./models/comment");

/* -------------------------------------------------------------------------- */
/*                                 DEVELOPMENT                                */
/* -------------------------------------------------------------------------- */
//Morgan
app.use(morgan("tiny"));

//Seed the DB
const seed = require("./utils/seed")
seed()
/* -------------------------------------------------------------------------- */
/*                               CONFIGURATIONS                               */
/* -------------------------------------------------------------------------- */
//connect to DB
mongoose.connect(config.database.connection());

//Express config
app.set("view engine", "ejs");
app.use(express.static("public"));

//Url encode config
app.use(
    express.urlencoded({
        extended: true,
    })
);

//Method override config
app.use(methodOverride("_method"));

//Route config
app.use("/games", gameRoutes);
app.use("/games/:id/comments", commentRoutes);
app.use("/", mainRoutes);

/* -------------------------------------------------------------------------- */
/*                                   LISTEN                                   */
/* -------------------------------------------------------------------------- */
app.listen(port, () => console.log(`Yelp_games is working on port ${port}`));
