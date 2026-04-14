const validator = require("validator");

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;

    if (!firstName || !lastName) {
        throw new Error("Enter valid name..!");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Enter valid email..!");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter strong password..!");
    }
}

const validateProfileEditData = (req) => {
    const allowedEditFields = ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"];
    
    const isUpdateAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));
    return isUpdateAllowed;
};

module.exports = {
    validateSignUpData,
    validateProfileEditData,
}