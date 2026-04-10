const mongoose = require('mongoose');

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
    },
    password: {
        type: String,
        required: true,
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
        maxlength: 50,
    }
}, { timestamps: true });

// const User = mongoose.model("User", userSchema);
// module.exports = User;

module.exports = mongoose.model("User", userSchema);