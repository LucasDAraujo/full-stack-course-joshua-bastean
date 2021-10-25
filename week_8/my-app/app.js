const { last_name } = require("casual");
const casual = require("casual");

// let people = [];

// for (let i = 0; i < 20; i++) {
//     people.push(casual.full_name);
// }
// console.log(people);

// class Person {
//     constructor(
//         name,
//         stateAbbr,
//         city,
//         birthDate,
//         creditCardNumber,
//         creditCardExp
//     ) {
//         this.name = name;
//         this.address = stateAbbr;
//         this.stateAbbr = city;
//         this.birthDate = birthDate.split("-");
//         this.creditCardNumber = creditCardNumber;
//         this.creditCardExp = creditCardExp;
//     }

//     talk() {
//         casual.sentence();
//     }
// }

// const people = [];

// for (let i = 0; i < 20; i++) {
//     const personLoop = new Person(
//         casual.full_name,
//         casual.address,
//         casual.state_abbr,
//         casual.date(),
//         casual.card_exp(),
//         casual.card_exp
//     );
//     people.push(personLoop);
// }

const output = [];
for (let i = 0; i < 20; i++) {
    output.push({
        firstName: casual.first_name,
        lastName: casual.last_name,
        address: casual.address,
        stateAbbr: casual.state_abbr,
        creditCardNumber: casual.card_number(),
        creditCardExp: casual.card_exp,
    });
}

console.log(output)
