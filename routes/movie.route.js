const express = require('express');
const movieController = require('../controllers/movie.controller');

const router = express.Router();

/**
 * Route: POST /mba/api/v1/movies
 * Description: Create a new movie
 */
router.post('/', movieController.createMovie);

module.exports = router;