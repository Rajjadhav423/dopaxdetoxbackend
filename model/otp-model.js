const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    otp: {
        type: String,
        required: true,
    },
    validity: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 5 * 60 * 1000), // Default validity is 5 minutes from creation
    },
});

module.exports = mongoose.model('Otp', otpSchema);