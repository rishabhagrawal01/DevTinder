const express = require('express');

const app = express();

app.use("/", (req, res) => {
    res.send('Hello from home page!');
});

app.use("/hello", (req, res) => {
    res.send('Hello Hello Hello');
});

app.use("/test", (req, res) => {
    res.send('Hello, World from server!');
});

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});