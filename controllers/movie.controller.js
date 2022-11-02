const movies = require('../models/movie.model');

const findAllMovies = async (req, res) => {
    if (req.query.status === "PUBLISHED") {
        const list = await movies.find({published: true});
        res.send(list);
    }
    else if (req.query.status === "RELEASED") {
        const list = await movies.find({released: true});
        res.send(list);
    }
    else {
        const list = await movies.find();
        res.send(list);
    }
    
}

const findOne = async (req, res) => {
    let id = parseInt(req.params.movieId);
    const list = await movies.find({movieid: id});
    res.send(list);
}

const findShows = async (req, res) => {
    console.log(req.query);
    let title = req.query.title;
    let genres = req.query.genres;
    let artists = req.query.artists;
    let start_date = req.query.startdate;
    let end_date = req.query.enddat;
    const list = await movies.find({
        $or: [
            {title: title},
            {genres: genres},
            {artists: artists},
            // {release_date: {$gte: start_date, $lte: end_date}},
        ]
    });
    res.send(list);
}

module.exports = {findAllMovies, findOne, findShows};