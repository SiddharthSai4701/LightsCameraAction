const { makeErrorResponse } = require('../utils/response')

const validateTheatreCreateRequest = (req, res, next) => {

    if(!req.body.name) {
        return res.status(400).json(makeErrorResponse("The name of the theatre is required"))
    }

    if (!req.body.pincode) {
        return res.status(400).json(makeErrorResponse("The pincode of the theatre is required"))
    }

    if (!req.body.city) {
        return res.status(400).json(makeErrorResponse("The city of the theatre is required"))
    }

    next()
}

module.exports = {validateTheatreCreateRequest}
