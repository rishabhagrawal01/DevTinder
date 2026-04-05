const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

// GET any user by emailId
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const user = await User.findOne({ emailId: userEmail });
        if (!user) {
            res.status(404).send("User not found..!");
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(400).send("Something went wrong..!" + err);
    }
});

// GET /feed => Get all users
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong..!" + err);
    }
})

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
