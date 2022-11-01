const mongoose = require("mongoose");
const dataBaseObj = require("../config/db.config");

const genreSchema = new mongoose.Schema({
    genreid: Number,
    genre: String,
});

module.exports = mongoose.model("genres", genreSchema);