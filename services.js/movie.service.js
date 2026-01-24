const movieModel = require('../models/movie.model')

const getMovieById = async (id) => {
    const movie = await movieModel.findOne({movieID: id})

    if(!movie) {
        return {
            err: "No movie found with this ID",
            status: 404
        }
    }

    return movie
}

module.exports = {
    getMovieById
}