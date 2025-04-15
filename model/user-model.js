const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
    console.log("this runction run ", this)
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (plainPassword) {
     console.log("cpmare password function run ", plainPassword)
    return await bcrypt.compare(plainPassword, this.password);
};

// Create the user model
const User = mongoose.model('User', userSchema);

module.exports = User;
