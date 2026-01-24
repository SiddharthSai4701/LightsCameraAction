const express = require('express');
const movieController = require('../controllers/movie.controller');

const router = express.Router();

/**
 * Route: POST /mba/api/v1/movies
 * Description: Create a new movie
 */
router.post('/', movieController.createMovie);
router.get('/:id', movieController.getMovie);
router.delete('/:id', movieController.deleteMovie)

module.exports = router;