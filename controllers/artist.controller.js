const artists = require('../models/artist.model');

const findAllArtists = async (req, res) => {
    const list = await artists.find();
    res.send(list);
}

module.exports = findAllArtists;