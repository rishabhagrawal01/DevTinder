const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());


// POST /signup => Create a new user
app.post('/signup', async (req, res) => {
    try {
        // validate the data
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        // encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        await user.save();
        res.send("User added successfully..!");
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

// POST /login => Login a user
app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isPasswordCorrect = await user.validatePassword(password);
        if (isPasswordCorrect) {
            var token = await user.getJWT();
            
            res.cookie("token", token, { expires: new Date(Date.now() + 86400000) });
            res.send("Login successful..!");
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

// GET /profile => Get the profile of the logged-in user
app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(`${user.firstName} sent a connection request!`);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
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
