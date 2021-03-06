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
app.use(express.urlencoded({ extended: true }));

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

/* -------------------------------------------------------------------------- */
/*                                   ROUTES                                   */
/* -------------------------------------------------------------------------- */

//Index route
app.get("/", (req, res) => {
    res.render("index");
});

//Account route
app.get("/account", isLoggedIn, (req, res) => {
    res.render("account");
});

//Signup New
app.get("/signup", (req, res) => {
    res.render("signup");
});

//Signup Create
app.post("/signup", async (req, res) => {
    try {
        const newUser = await User.register(
            new User({
                username: req.body.username,
                email: req.body.email,
            }),
            req.body.password //Automatically hash and salt the password
        );
        console.log(newUser);
        passport.authenticate("local")(req, res, () => {
            res.redirect("/account");
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

//Login route
app.get("/login", (req, res) => {
    res.render("login");
});
app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/account",
        failureRedirect: "/login",
    })
);

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

//Authorization middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        //Is the user logged in? if so, continue
        return next();
    } else {
        //else, redirect to /login
        res.redirect("/login");
    }
}

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
