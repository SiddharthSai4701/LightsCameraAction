const theatreModel = require('../models/theatre.model')
const { v4 } = require('uuid');


const createTheatre = async (data) => {
    
try {
    data.theatreID = v4()
    const response = await theatreModel.create(data)
    return response;
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

module.exports = {
    createTheatre
}
