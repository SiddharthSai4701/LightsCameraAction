const movieModel = require('../models/movie.model')

const createMovie = async (data) => {
    const movie = await movieModel.create(data);
    return movie;
}


const getMovieById = async (id) => {

    const movie = await movieModel.findOne({movieID: id})

    if (!movie) {
        return {
            err: "No movie found with this ID",
            status: 404
        }
    }

    return movie
}

const deleteMovieById = async (id) => {
    const response = await movieModel.deleteOne({ movieID: id })
    return response
}

module.exports = {
    getMovieById,
    createMovie,
    deleteMovieById
}