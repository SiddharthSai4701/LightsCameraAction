const movieModel = require('../models/movie.model')

/**
 * Controller function to create a new movie
 * @param {*} req {name, description, ...} 
 * @param {*} res {movie}
 * @returns Movie created
 */
const createMovie = async (req, res) => {
    try {
        const movie = await movieModel.create(req.body)
        return res.status(201).json({
            success: true,
            error: {},
            data: movie,
            message: 'Successfully created a new movie'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
            data: {},
            message: 'Something went wrong'
        })
    }
}

module.exports = { createMovie };