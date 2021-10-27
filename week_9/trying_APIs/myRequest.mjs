// fetch("https://www.goole.com")
//     .then((data) => {
//         return data.toUpperCase();
//     })
//     .then((data) => {
//         return data.split(" ");
//     })
//     .then((data))
//     .catch((err) => {
//     });

import fetch from "node-fetch";
// const fetch = require('node-fetch')
// fetch("https://www.goole.com")
 fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((response) => {
        console.log(response[0].name);
    })
    .catch((err) => {
        console.log(err.message);
    });
