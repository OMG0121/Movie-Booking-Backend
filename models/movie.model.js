const mongoose = require("mongoose");
const dataBaseObj = require("../config/db.config");

const moviesSchema = new mongoose.Schema({
    movieid: Number,
    title: String,
    published: Boolean,
    released: Boolean,
    poster_url: String,
    released_date: String,
    published_date: String,
    artists: Array,
    genres: Array,
    duration: Number,
    critic_rating: Number,
    trailer_url: String,
    wiki_url: String,
    story_line: String,
    shows: Array
});

const movies = mongoose.model("movies", moviesSchema);

module.exports = movies;