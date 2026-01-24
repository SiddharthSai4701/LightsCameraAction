const movieModel = require('../models/movie.model')
const movieService = require('../services.js/movie.service')

const { uuid } = require('uuidv4');


const errorResponseBody = {
    err: {},
    data: {},
    message: 'Something went wrong',
    success: false
}

const successResponseBody = {
    err: {},
    data: {},
    message: 'Successfully processed request',
    success: true
}

/**
 * Controller function to create a new movie
 * @param {*} req {name, description, ...} 
 * @param {*} res {movie}
 * @returns Movie created
 */
const createMovie = async (req, res) => {
    req.body.movieID = uuid();
    try {
        const movie = await movieModel.create(req.body)
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
            return res.status(response.code).json({
                errorResponseBody
            })
        }
        
        successResponseBody.data = response
        return res.status(200).json(successResponseBody)

    } catch (error) {
        console.log(error)
        errorResponseBody.err = error
        return res.status(500).json(errorResponseBody)
    }
}

module.exports = { createMovie, getMovie };