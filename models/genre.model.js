const mongoose = require("mongoose");
const dataBaseObj = require("../config/db.config");

const genreSchema = new mongoose.Schema({
    genreid: Number,
    genre: String,
});

const genres = mongoose.model("genres", genreSchema)

module.exports = genres;