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
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const expressSession = require("express-session");

//- ROUTE IMPORTS -
const gameRoutes = require("./routes/games");
const commentRoutes = require("./routes/comments");
const mainRoutes = require("./routes/main");
const authRoutes = require("./routes/auth");

//- MODEL IMPORTS -
const Game = require("./models/game");
const Comment = require("./models/comment");
const User = require("./models/user");

/* -------------------------------------------------------------------------- */
/*                                 DEVELOPMENT                                */
/* -------------------------------------------------------------------------- */
//Morgan
app.use(morgan("tiny"));

//Seed the DB
// const seed = require("./utils/seed");
// seed();

/* -------------------------------------------------------------------------- */
/*                               CONFIGURATIONS                               */
/* -------------------------------------------------------------------------- */
//connect to DB
mongoose.connect(config.database.connection());

//Express config
app.set("view engine", "ejs");
app.use(express.static("public"));

//Express Session Configuration
app.use(
    expressSession({
        secret: "aLSDKAhdpoasudhasdasxcosncsad689&W#&@W#2332*-ASD+ASDQWRE5R",
        resave: "false",
        saveUninitialized: false,
    })
);

//Url encode config
app.use(
    express.urlencoded({
        extended: true,
    })
);

//Method override config
app.use(methodOverride("_method"));

//Passport configuration
app.use(passport.initialize());
app.use(passport.session()); //Allows persistent sessions
passport.serializeUser(User.serializeUser()); //Tells us what data should be stored in sesion
passport.deserializeUser(User.deserializeUser()); // Get the user data from th e stored session
passport.use(new LocalStrategy(User.authenticate())); // Use the local strategy

//Current user middleware config
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

//Route config
app.use("/games", gameRoutes);
app.use("/games/:id/comments", commentRoutes);
app.use("/", authRoutes);
app.use("/", mainRoutes);

/* -------------------------------------------------------------------------- */
/*                                   LISTEN                                   */
/* -------------------------------------------------------------------------- */
app.listen(port, () => console.log(`Yelp_games is working on port ${port}`));
