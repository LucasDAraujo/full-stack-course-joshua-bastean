const express = require("express");
const app = express();
const port = 3000;
const config = require("./config");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local");
const expressSession = require("express-session");
const User = require("./models/user");

app.set("view engine", "ejs");

mongoose.connect(config.database.connection());

// Express Session Config
app.use(
    expressSession({
        secret: "asidutq0r87tr32riuhpwdiusadwd7wqteqre937r3h2r39872",
        resave: false,
        saveUninitialized: false,
    })
);

//Passport config
app.use(passport.initialize());
app.use(passport.session()); //Allows persistent sessions
passport.serializeUser(User.serializeUser()); //Encondes data into the session(from passport-local-mongoose)
passport.deserializeUser(User.deserializeUser()); //Decodes data from the session(from passport-local-mongoose)
const LocalStrategy = passportLocal.Strategy;
passport.use(new LocalStrategy(User.authenticate()));

//Index route
app.get("/", (req, res) => {
    res.render("index");
});

//Account route
app.get("/account", (req, res) => {
    res.render("account");
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
