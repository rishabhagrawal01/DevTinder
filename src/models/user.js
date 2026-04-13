const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 20,
    },
    lastName: {
        type: String,
        minlength: 4,
        maxlength: 20,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is not valid..!");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Password is not strong enough..!");
            }
        },
    },
    age: {
        type: Number,
        min: 10,
    },
    gender: {
        type: String,
        minlength: 4,
        maxlength: 6,
        // dont run by default on PATCH, PUT requests, run only for new users.
        validate(value) {
            if (!["Male", "Female", "Others"].includes(value)) {
                throw new Error("Gender data is not valid..!");
            }
        },
    },
    photoUrl: {
        type: String,
        required: true,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1dYyZHQORoZOwK_QeGegJUP_srIMerg7Aw&s",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Photo URL is not valid..!");
            }
        }
    },
    about: {
        type: String,
        minlength: 10,
        maxlength: 100,
        default: "This is the default about of the user..!",
    },
    skills: {
        type: [String],
        minlength: 2,
        maxlength: 15,
    }
}, { timestamps: true });

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, 'SECRET_KEY', { expiresIn: '1d' });
    return token;
};

userSchema.methods.validatePassword = async function (passwordEnteredByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordCorrect = await bcrypt.compare(passwordEnteredByUser, passwordHash);
    return isPasswordCorrect;
};

module.exports = mongoose.model("User", userSchema);