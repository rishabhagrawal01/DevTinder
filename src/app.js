const express = require('express');

const app = express();

/**
 * When we search for a route e.g. /hello/123 it checks and sees if there is a handler for /hello/123, if not  it checks for /hello and then for / and so on.
 * The sequence of request handlers or routes matters.
 */


// handle GET request for /user route
app.get("/user", (req, res) => {
    res.send({firstname: "Rishabh", lastname: "Agrawal"});
});

// handle POST request for /user route
app.post("/user", (req, res) => {
    // data sent to DB
    res.send("Sent data successfully");
});

// handle DELETE request for /user route
app.delete("/user", (req, res) => {
    // delete data from DB
    res.send("Deleted data successfully");
});

// handle PATCH request for /user route
app.patch("/user", (req, res) => {
    // update data in DB
    res.send("Updated data successfully");
});


// handle all methods for /user route
app.use("/test", (req, res) => {
    res.send('Hello, World from server!');
});

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});