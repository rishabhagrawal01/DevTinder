const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./utils/validation");

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

// DELETE /user => Delete a user by _id
app.delete("/user", async (req, res) => {
    const userId = req.body._id;
    try {
        // const user = await User.findByIdAndDelete(userId);
        const user = await User.findByIdAndDelete({ _id: userId });
        res.send("User deleted successfully..!");
    } catch (err) {
        res.status(400).send("Failed to delete user..!" + err);
    }
})

// PATCH /user => Update a user by _id
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ["photoUrl", "about", "skills", "password", "age"];
        const isUpdateAllowed = Object.keys(data).every((x) => ALLOWED_UPDATES.includes(x));

        if (!isUpdateAllowed) {
            throw new Error("Invalid update fields..!");
        }
        if (data?.skills.length > 10) {
            throw new Error("Maximum 10 skills allowed..!");
        }
        const user = await User.findByIdAndUpdate(userId, data, { returnDocument: "after", runValidators: true });

        res.send("User updated successfully..!");
    } catch (err) {
        res.status(400).send("Failed to update user: " + err.message);
    }
});

// POST /login => Login a user
app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId : emailId });
        if (!user){
            throw new Error("Invalid credentials");
        } 
        else {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                throw new Error("Invalid credentials");
            } else {
                res.send("Login successful..!");
            }
        }
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
