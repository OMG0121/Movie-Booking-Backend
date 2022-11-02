const genres = require('../models/genre.model');

const findAllGenres = async (req, res) => {
    const list = await genres.find();
    res.send(list);
}

module.exports = findAllGenres;