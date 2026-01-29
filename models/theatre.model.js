const mongoose = require('mongoose')
/**
 * Defines the schema for the theatre resource
 */

const theatreSchema = new mongoose.Schema({
    theatreID: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    address: String
}, {timestamps: true})

const Theatre = mongoose.model('Theatre', theatreSchema)
module.exports = Theatre