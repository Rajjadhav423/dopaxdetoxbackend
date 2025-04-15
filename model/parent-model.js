const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    sixDigitNumber: {
        type: Number,
        required: true,
        min: 100000,
        max: 999999
    }
});

const Parent = mongoose.model('Parent', parentSchema);

module.exports = Parent;