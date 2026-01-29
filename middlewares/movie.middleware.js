const badRequestResponse = {
    success: false,
    err: "",
    data: {},
    message: "Bad request | Malformed request"
}

const validateMovieCreateRequest = async (req, res, next) => {
    if (!req.body.name) {
        badRequestResponse.err = "The name of the movie is not present"
        return res.status(400).json(badRequestResponse)
    }

    if (!req.body.description) {
        badRequestResponse.err = "The description of the movie is not present"
        return res.status(400).json(badRequestResponse)
    }

    if (!req.body.cast || !(req.body.cast instanceof Array) || req.body.cast.length <=0 ) {
        badRequestResponse.err = "The cast of the movie is not present"
        return res.status(400).json(badRequestResponse)
    }

    if (!req.body.trailerUrl) {
        badRequestResponse.err = "The trailer URL of the movie is not present"
        return res.status(400).json(badRequestResponse)
    }

    if (!req.body.releaseDate) {
        badRequestResponse.err = "The release date of the movie is not present"
        return res.status(400).json(badRequestResponse)
    }

    if (!req.body.director) {
        badRequestResponse.err = "The director of the movie is not present"
        return res.status(400).json(badRequestResponse)
    }
    
    next()
}

module.exports = {
    validateMovieCreateRequest
}
