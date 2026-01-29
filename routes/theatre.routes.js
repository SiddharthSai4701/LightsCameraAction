const express = require('express')
const theatreController = require('../controllers/theatre.controller')

const router = express.Router();

router.post('/', theatreController.createTheatre);

module.exports = router