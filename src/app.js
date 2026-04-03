const express = require('express');

const app = express();

/**
 * When we search for a route e.g. /hello/123 it checks and sees if there is a handler for /hello/123, if not  it checks for /hello and then for / and so on.
 * The sequence of request handlers or routes matters.
 */


app.use("/user", (req, res, next) => {
    console.log("1st handler for /user route");
    next();
},
    [(req, res, next) => {
        console.log("2nd handler for /user route");
        next();
    },
    (req, res, next) => {
        console.log("3rd handler for /user route");
        next();
        res.send("3rd response!");
    }],
(req, res, next) => {
        console.log("4th handler for /user route");
        next();
},
(req, res, next) => {
        console.log("5th handler for /user route");
        res.send("5th response!");
});

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});