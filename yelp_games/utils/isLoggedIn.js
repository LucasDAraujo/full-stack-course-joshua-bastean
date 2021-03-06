const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "Hey! you must be logged in to do that");
        res.redirect("/login");
    }
};

module.exports = isLoggedIn;
