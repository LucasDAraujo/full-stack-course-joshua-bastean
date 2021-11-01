const mongoose = require("mongoose");

const configFile = require("../../week_10/config");

mongoose.connect(configFile.database.connection());

//Create the schemas
const userSchema = new mongoose.Schema({
    username: String,
    full_name: String,
    // addresses: [
    //     {
    //         street: String,
    //         state: String,
    //         city: String,
    //         zip: String,
    //     },
    // ],

    //Adding addresses to the array
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
        },
    ],
});

const addressSchema = new mongoose.Schema({
    street: String,
    state: String,
    city: String,
    zip: String,
});

const User = mongoose.model("User", userSchema);
const Address = mongoose.model("Address", addressSchema);

//Execute Commands
User.create({
    username: "Paul",
    full_name: "Joseph Steban",
    addresses: [],   

    //This way is good for small data
    // addresses: [
    //     {
    //         street: "123 Any Street",
    //         state: "NY",
    //         city: "New York",
    //         zip: "12345",
    //     },
    //     {
    //         street: "300 E college Ave",
    //         state: "Hartsville",
    //         city: "SC",
    //         zip: "29550",
    //     },
    // ],
})
    .then((newUser) => {
        console.log(newUser);
    })
    .catch((err) => console.log(err));

Address.create({
    Street: "123 Any Street",
    City: "New York",
    State: "NY",
    zip: "12345",
})
    .then((newAddress) => console.log(newAddress))
    .catch((err) => console.log(err));
