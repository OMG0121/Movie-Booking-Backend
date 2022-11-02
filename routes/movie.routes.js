const express = require('express');
const {findAllMovies, findOne, findShows} = require('../controllers/movie.controller')

const router = express.Router();

router.get('/api/movies', findAllMovies);

router.get('/api/movies/search', findShows);

router.get('/api/movies/:movieId', findOne);

module.exports = router;