const Comment = require("../models/comment");

//Check if the user is logged in
const checkCommentOwner = async (req, res, next) => {
    if (req.isAuthenticated()) {
        const comment = await Comment.findById(req.params.commentId).exec();

        //If logged in , check if he they own the comment
        if (comment.user.id.equals(req.user._id)) {
            
            next();
        } else {
            //If not, redirect back to the show page
            res.redirect("back");
        }
    } else {
        //If not logged in, redirect to /login
        res.redirect("/login");
    }
};

module.exports = checkCommentOwner;
