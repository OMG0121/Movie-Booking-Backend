const express = require('express');
const findAllArtists = require('../controllers/artist.controller')

const router = express.Router();

router.get('/api/artists', findAllArtists);

module.exports = router;