/* -------------------------------------------------------------------------- */
/*                               SECTION IMPORTS                              */
/* -------------------------------------------------------------------------- */

//- ANCHOR CONFIG IMPORT -
try {
    var config = require("./config");
} catch (err) {
    console.log(
        "Could not import config. This probably means you're not working locally"
    );
    console.log(err);
}

//- ANCHOR NPM IMPORTS -
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const morgan = require("morgan");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const expressSession = require("express-session");
const flash = require("connect-flash");

//- ANCHOR ROUTE IMPORTS -
const gameRoutes = require("./routes/games");
const commentRoutes = require("./routes/comments");
const mainRoutes = require("./routes/main");
const authRoutes = require("./routes/auth");

//- ANCHOR MODEL IMPORTS -
const Game = require("./models/game");
const Comment = require("./models/comment");
const User = require("./models/user");

/* -------------------------------- !SECTION -------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                 DEVELOPMENT                                */
/* -------------------------------------------------------------------------- */
//ANCHOR Morgan
app.use(morgan("tiny"));

//Seed the DB
// const seed = require("./utils/seed");
// seed();

/* -------------------------------------------------------------------------- */
/*                           SECTION CONFIGURATIONS                           */
/* -------------------------------------------------------------------------- */

//ANCHOR MONGOOSE CONFIG
try {
    mongoose.connect(config.database.connection());
} catch (err) {
    console.log(
        "Could not connect using config. This probably means you are not working locally"
    );
    mongoose.connect(process.env.DB_CONNECTION_STRING);
}

//ANCHOR Express config
app.set("view engine", "ejs");
app.use(express.static("public"));

//ANCHOR Express Session Configuration
app.use(
    expressSession({
        secret: process.env.ES_SECRET || config.expressSession.secret,
        resave: "false",
        saveUninitialized: false,
    })
);

//ANCHOR Url encode config
app.use(
    express.urlencoded({
        extended: true,
    })
);

//ANCHOR Method override config
app.use(methodOverride("_method"));

//ANCHOR Connect Flash
app.use(flash());

//ANCHOR Passport configuration
app.use(passport.initialize());
app.use(passport.session()); //Allows persistent sessions
passport.serializeUser(User.serializeUser()); //Tells us what data should be stored in session
passport.deserializeUser(User.deserializeUser()); // Get the user data from th e stored session
passport.use(new LocalStrategy(User.authenticate())); // Use the local strategy

//ANCHOR State config
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.errorMessage = req.flash("error");
    res.locals.successMessage = req.flash("success");
    res.locals.dangerMessage = req.flash("danger");
    next();
});

//ANCHOR Route config
app.use("/games", gameRoutes);
app.use("/games/:id/comments", commentRoutes);
app.use("/", authRoutes);
app.use("/", mainRoutes);
/* -------------------------------- !SECTION -------------------------------- */

/* ------------------------------ ANCHOR LISTEN ----------------------------- */
app.listen(process.env.PORT || port, () =>
    console.log(`Yelp_games is working on port ${port}`)
);
