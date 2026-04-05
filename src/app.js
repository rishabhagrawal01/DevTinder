const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post('/signup', async (req, res) => {
    // Creating a new instance of the User model
    const user = new User(req.body);
    
    try {
        await user.save();
        res.send("User added successfully..!");
    } catch (err) {
        res.status(400).send("Failed to add user..!" + err);
    }
});

connectDB()
    .then(() => {   
        console.log("Database connected successfully.");
        app.listen(7777, () => {
            console.log('Server is running on port 7777');
        });
    })
    .catch((err) => {
        console.error("Failed to connect to database!", err);
    });
