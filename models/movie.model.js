const mongoose = require('mongoose')

/**
 * Definethe schema for the movie resource to be stored in the db
 */

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cast: {
        type: [String],
        required: true
    },
    trailerUrl: {
        type: String,
        required: true
    },
    language: {
        type: [String],
        required: true,
        default: "English"
    },
    releaseDate: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseStatus: {
        type: String,
        required: true,
        default: "RELEASED"
    },
}, {
    timestamps: true
})

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;