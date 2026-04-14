const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { validateProfileEditData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        const isUpdateAllowed = validateProfileEditData(req);
        if (!isUpdateAllowed) {
            throw new Error("Invalid update fields");
        }

        const loggedInUser = req.user;
        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);

        await loggedInUser.save();
        res.json({
            message: `${loggedInUser.firstName}, your profile updated successfully..!`,
            data: loggedInUser,
        });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            throw new Error("All fields are required");
        }

        const user = req.user;

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordMatch) {
            throw new Error("Your entered old password is incorrect");
        }

        const isNewPasswordStrong = validator.isStrongPassword(newPassword);
        if (!isNewPasswordStrong) {
            throw new Error("New password is not strong enough");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();
         res.json({
            success: true,
            message: `${user.firstName}, your password was updated successfully`
        });

    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = profileRouter;