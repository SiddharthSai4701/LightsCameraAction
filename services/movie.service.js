const movieModel = require('../models/movie.model')

const createMovie = async (data) => {
    try {
        const movie = await movieModel.create(data);
        return movie;
    } catch (error) {
        if (error.name === 'ValidationError') {
            const message = Object.values(error.errors).map(val => val.message).join(', ');
            return {
                err: message,
                status: 422
            }
        }
        throw error;
    }
}


const getMovieById = async (id) => {

    const movie = await movieModel.findOne({movieID: id})

    if (!movie) {
        return {
            err: "No movie found with this ID",
            status: 404
        }
    }

    return movie
}

const updateMovieById = async (id, data) => {
    try {
        const movie = await movieModel.findOneAndUpdate({ movieID: id }, data, { new: true, runValidators: true });
        
        if (!movie) {
            return {
                err: "No movie found with this ID to update",
                status: 404
            }
        }
        
        return movie
    } catch (error) {
        let err = {}
        if (error.name === 'ValidationError') {
            const message = Object.values(error.errors).map(val => val.message).join(', ');
            return {
                err: message,
                status: 422
            }
        }
        throw error;
    }
}

const deleteMovieById = async (id) => {
    const response = await movieModel.deleteOne({ movieID: id })
    
    if(response.deletedCount === 0) {
        return {
            err: "No movie found with this ID to delete",
            status: 404
        }
    }
    
    return response
}

module.exports = {
    getMovieById,
    createMovie,
    updateMovieById,
    deleteMovieById
}