const mongoose = require("mongoose");
const dataBaseObj = require("../config/db.config");

const usersSchema = new mongoose.Schema({
    userid: Number,
    email: String,
    first_name: String,
    last_name: String,
    username: String,
    contact: String,
    password: String,
    role: String,
    isLoggedIn: Boolean,
    uuid: String,
    accesstoken: String,
    coupens: Array,
    bookingRequests: Array,
});

module.exports = mongoose.model("users", usersSchema);