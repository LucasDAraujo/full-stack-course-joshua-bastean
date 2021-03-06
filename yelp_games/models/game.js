//Importing mongoose
const mongoose = require("mongoose");

//Using mongoose.schema to create the ganeSchema
const gameSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    developer: String,
    publisher: String,
    genre: String,
    date: Date,
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        username: String,
    },
    upvotes: [String],
    downvotes: [String],
});

//Compiling the game schema into a more advanced constant with CAPITAL C using  mongoose.model
//and exporting

gameSchema.index({
    "$**": "text",
});
//On all fields, index any text

module.exports = mongoose.model("Game", gameSchema);
