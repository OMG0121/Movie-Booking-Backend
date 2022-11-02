const express = require('express');
const {findAllMovies, findOne, findShows} = require('../controllers/movie.controller')

const router = express.Router();

router.get('/movies', findAllMovies);

router.get('/movies/search', findShows);

router.get('/movies/:movieId', findOne);

module.exports = router;