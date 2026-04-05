const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://rishabhagrawal:LfG8uDfZpoKlhZLl@namastenode.1je6ysb.mongodb.net/devTinder");
};

module.exports = connectDB;