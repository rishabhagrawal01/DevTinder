const express = require('express');

const app = express();
const { adminAuth, userAuth } = require("./middlewares/auth");

/**
 * When we search for a route e.g. /hello/123 it checks and sees if there is a handler for /hello/123, if not  it checks for /hello and then for / and so on.
 * The sequence of request handlers or routes matters.
 */

// GET/route => middleware chain => request handler => response

// we use middlewares for authentication, we generally have two ways: 
// 1. at the top level, so it will be executed for all routes => like in admin route
// 2. at the route level, so it will be executed only for that route => like in user route 

app.use("/admin", adminAuth);

app.post("/user/login", (req, res) => {
    res.send("User logged in!");
});

app.get("/user/data", userAuth, (req, res) => {
    res.send("User data sent!");
});

app.get("/admin/getAllData", (req, res) => {
    res.send("All data sent!");
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("User deleted!");
});

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});