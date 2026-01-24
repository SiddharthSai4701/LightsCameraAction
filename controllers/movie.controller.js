const movieModel = require('../models/movie.model')
const {successResponseBody, errorResponseBody } = require('../utils/response')
const movieService = require('../services.js/movie.service')

const { uuid } = require('uuidv4');


/**
 * Controller function to create a new movie
 * @param {*} req {name, description, ...} 
 * @param {*} res {movie}
 * @returns Movie created
 */
const createMovie = async (req, res) => {
    req.body.movieID = uuid();
    try {
        
        const movie = await movieService.createMovie(req.body)

        successResponseBody.data = movie
        successResponseBody.message = 'Successfully created a new movie'

        return res.status(201).json(successResponseBody)
        
    } catch (error) {
        return res.status(500).json(errorResponseBody)
    }
}

const getMovie = async (req, res) => {
    try {

        const response = await movieService.getMovieById(req.params.id);

        if (response.err) {
            errorResponseBody.err = response.err
            return res.status(response.status).json({
                errorResponseBody
            })
        }

        successResponseBody.message = 'Successfully deleted movie'
        successResponseBody.data = response

        return res.status(200).json(successResponseBody)

    } catch (error) {
        console.log(error)
        errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
    }
}

const deleteMovie = async (req, res) => {
    try {
        const response = await movieService.deleteMovieById(req.params.id)
        successResponseBody.data = response
        successResponseBody.message = "Successfully deleted movie"
        return res.status(200).json(successResponseBody) 

    } catch (error) {
        console.log(error)
        return res.status(500).json(errorResponseBody)
    }
}

module.exports = { createMovie, getMovie, deleteMovie };