const { makeSuccessResponse, makeErrorResponse } = require('../utils/response')
const movieService = require('../services/movie.service')

const { v4 } = require('uuid');


/**
 * Controller function to create a new movie
 * @param {*} req {name, description, ...} 
 * @param {*} res {movie}
 * @returns Movie created
 */
const createMovie = async (req, res) => {
    req.body.movieID = v4();
    try {
        
        const response = await movieService.createMovie(req.body)

        if(response.err) {
            return res.status(response.status).json(makeErrorResponse(response.err));
        }

        return res.status(201).json(makeSuccessResponse(response, 'Successfully created a new movie'))
        
    } catch (error) {
        return res.status(500).json(makeErrorResponse(error.message))
    }
}

const getMovie = async (req, res) => {
    try {

        const response = await movieService.getMovieById(req.params.id);

        if (response.err) {
            return res.status(response.status).json(makeErrorResponse(response.err))
        }

        return res.status(200).json(makeSuccessResponse(response, 'Successfully fetched movie'))

    } catch (error) {
        console.log(error)
        return res.status(500).json(makeErrorResponse(error.message))
    }
}

const updateMovie = async (req, res) => {
    try {
        const response = await movieService.updateMovieById(req.params.id, req.body)

        if (response.err) {
            return res.status(response.status).json(makeErrorResponse(response.err))
        }

        return res.status(200).json(makeSuccessResponse(response, 'Successfully updated movie'))
    } catch (error) {
        console.log(error)
        return res.status(500).json(makeErrorResponse(error.message))
    }
}

const deleteMovie = async (req, res) => {
    try {
        const response = await movieService.deleteMovieById(req.params.id)
        
        if (response.err) {
             return res.status(response.status).json(makeErrorResponse(response.err))
        }

        return res.status(200).json(makeSuccessResponse(response, 'Successfully deleted movie')) 

    } catch (error) {
        console.log(error)
        return res.status(500).json(makeErrorResponse(error.message))
    }
}

const getMovies = async (req, res) => {
    try {
        const response = await movieService.getMovies(req.query);

        if(res.error) {
            return res.status(404).json(makeErrorResponse(response.err))
        }

        return res.status(200).json(makeSuccessResponse(response, "Here are your movies"))
    } catch (error) {
        console.log(error)
    }
}

module.exports = { createMovie, getMovie, updateMovie, deleteMovie, getMovies };