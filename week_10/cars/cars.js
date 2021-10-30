//Add a new car to the DB
//Get all cars from database

const config = require("../config");
const mongoose = require("mongoose");

mongoose.connect(config.database.connection(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    color: String,
    mileage: Number,
    needsRepair: Boolean,
});

//Compiles the schema on the model
const Car = mongoose.model("Car", carSchema);

const myTruck = new Car({
    make: "Fiat",
    model: "Uno",
    year: "2020",
    color: "Black",
    mileage: 40000,
    needsRepair: false,
});
// One way
// myTruck.save((err, car) => (err ? console.log(err) : console.log(car)));

// Another way of saving
// Car.create(myTruck, (err, car) => (err ? console.log(err) : console.log(car)));

//Best way
//Using promises
Car.create(myTruck).then((err, car) =>
    err ? console.log(err) : console.log(car)
)
