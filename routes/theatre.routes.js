const express = require('express')
const theatreController = require('../controllers/theatre.controller')
const {validateTheatreCreateRequest} = require('../middlewares/theatre.middleware')

const router = express.Router();

router.post('/',
    validateTheatreCreateRequest,
    theatreController.createTheatre);

module.exports = router
