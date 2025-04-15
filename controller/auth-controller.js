const jwt = require('jsonwebtoken');
const userModel = require('../model/user-model');
const generateMessage = require('../helper/resMessage');

require('dotenv').config()

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input fields
        if (!name || !email || !password) {
            return generateMessage(res, 400, 'All fields are required');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return generateMessage(res, 400, 'Invalid email format');
        }

        // Validate password length
        if (password.length < 6) {
            return generateMessage(res, 400, 'Password must be at least 6 characters long');
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return generateMessage(res, 400, 'User already exists');
        }

        // Create a new user (password will be hashed in schema)
        const newUser = new userModel({ name, email, password });
        await newUser.save();

        return generateMessage(res, 201, 'User created successfully',{ user: newUser });
    } catch (error) {
        return generateMessage(res, 500, 'Internal server error', { error: error.message });
    }
};

const cookieOptions = {
    httpOnly: true, // Prevents JavaScript access to cookies
    sameSite: 'Strict', // Prevent CSRF
    maxAge: 60 * 60 * 1000, // 1 hour
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return generateMessage(res, 400, 'Email and password are required');
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return generateMessage(res, 404, 'User not found');
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return generateMessage(res, 401, 'Invalid credentials');
        }

        // Create JWT token
        const payload = { 
            id: user._id, 
            email: user.email,
            name: user.name 
        };
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error('JWT_SECRET is not defined');

        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        // Send cookie
        res.cookie('token', token, cookieOptions);

        // Prepare user object for response
        const userObj = user.toObject();
        userObj.token = token;
        delete userObj.password;

        return generateMessage(res, 200, 'Login successful',{token:token},{ user: userObj });
    } catch (error) {
        return generateMessage(res, 500, 'Internal server error', { error: error.message });
    }
};

module.exports = { signUp, login };