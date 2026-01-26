const express = require('express');
const movieController = require('../controllers/movie.controller');
const movieMiddleware = require('../middlewares/movie.middleware')

const router = express.Router();

/**
 * Route: POST /mba/api/v1/movies
 * Description: Create a new movie
 */
router.post('/', 
    movieMiddleware.validateMovieCreateRequest,
    movieController.createMovie);
router.get('/:id', movieController.getMovie);
router.get('/', movieController.getMovies) 
router.put('/:id', movieController.updateMovie)
router.delete('/:id', movieController.deleteMovie)

module.exports = router;