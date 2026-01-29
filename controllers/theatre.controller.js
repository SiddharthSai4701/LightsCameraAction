const theatreService = require('../services/theatre.service')
const { makeSuccessResponse, makeErrorResponse } = require('../utils/response')


const createTheatre = async (req, res) => {
    try {
        const response = await theatreService.createTheatre(req.body)

        if (response.err) {
            return res.status(response.status).json(makeErrorResponse(response.err));
        }
        return res.status(201).json(makeSuccessResponse(response, 'Successfully created theatre'))

    } catch (error) {
        return res.status(response.status).json(makeErrorResponse(response.err));
    }
}

module.exports = {
    createTheatre
}
