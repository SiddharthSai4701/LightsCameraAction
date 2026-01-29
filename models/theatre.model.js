const mongoose = require('mongoose')
/**
 * Defines the schema for the theatre resource
 */

const theatreSchema = new mongoose.Schema({
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
        typr: Number,
        required: true
    },
    address: String
}, {timestamps: true})

const Theatre = mongoose.Model('Theatre', theatreSchema)
module.exports = Theatre