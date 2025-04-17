// controller\auth-controller.js
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const userModel = require("../model/user-model");
const OTP = require("../model/otp-model");
const generateMessage = require("../helper/resMessage");
const sendOtpEmail = require('../helper/sendOtpMail');
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helper/token");
const otpGenerator = require('otp-generator')

require("dotenv").config();

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
      return generateMessage(res, 400, "All fields are required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return generateMessage(res, 400, "Invalid email format");
    }

    // Validate password length
    if (password.length < 6) {
      return generateMessage(
        res,
        400,
        "Password must be at least 6 characters long"
      );
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return generateMessage(res, 400, "User already exists");
    }

    // Create a new user (password will be hashed in schema)
    const newUser = new userModel({ name, email, password });
    await newUser.save();

    return generateMessage(res, 201, "User created successfully", {
      user: newUser,
    });
  } catch (error) {
    return generateMessage(res, 500, "Internal server error", {
      error: error.message,
    });
  }
};

const cookieOptions = {
  httpOnly: true, // Prevents JavaScript access to cookies
  sameSite: "Strict", // Prevent CSRF
  maxAge: 60 * 60 * 1000, // 1 hour
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return generateMessage(res, 400, "Email and password are required");
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return generateMessage(res, 404, "User not found");
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return generateMessage(res, 401, "Invalid credentials");
    }

    // Create JWT token
    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // const secret = process.env.JWT_SECRET;
    // if (!secret) throw new Error('JWT_SECRET is not defined');

    // const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    // // Send cookie
    // res.cookie('token', token, cookieOptions);

    // // Prepare user object for response
    // const userObj = user.toObject();
    // userObj.token = token;
    // delete userObj.password;
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return generateMessage(res, 200, "Login successful", { accessToken });

    // return generateMessage(res, 200, 'Login successful',{token:token},{ user: userObj });
  } catch (error) {
    return generateMessage(res, 500, "Internal server error", {
      error: error.message,
    });
  }
};

const refreshAccessToken = (req, res) => {
  try {
    const token = req.cookies.refreshToken || req.headers.authorization;
    // console.log("token is ",token)
    // Check if refresh token is present
    console.log(token)
    if (!token) {
      return generateMessage(res, 401, "Refresh token is missing");
    }

    // Verify the refresh token
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) {
        return generateMessage(res, 403, "Invalid refresh token");
      }

      // Generate a new access token
      const newAccessToken = generateAccessToken({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      return generateMessage(res, 200, "Access token refreshed successfully", {
        accessToken: newAccessToken,
      });
    });
  } catch (error) {
    console.log("request here");
    return generateMessage(res, 500, "Internal server error", {
      error: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email)
    if (!email) {
      return generateMessage(res, 400, "Email is required");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return generateMessage(res, 404, "User not found");
    }

    // Generate 6 digit numeric OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      alphabets: false,
      digits: true,
    });
    console.log("otp is ", otp)
    const validity = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    // Save or update OTP in DB
    await OTP.findOneAndUpdate(
      { email },
      { email, otp, validity },
      { upsert: true, new: true }
    );

    // Send OTP to user via email
    await sendOtpEmail(email, otp);

    return generateMessage(res, 200, "OTP sent to your email");
  } catch (error) {
    return generateMessage(res, 500, "Internal server error", {
      error: error.message,
    });
  }
};
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return generateMessage(res, 400, "Email and OTP are required");
    }

    const otpRecord = await OTP.findOne({ email });

    if (!otpRecord) {
      return generateMessage(res, 404, "OTP not found");
    }

    if (otpRecord.otp !== otp) {
      return generateMessage(res, 400, "Invalid OTP");
    }

    if (otpRecord.validity < new Date()) {
      return generateMessage(res, 400, "OTP expired");
    }

    return generateMessage(res, 200, "OTP verified successfully");
  } catch (error) {
    return generateMessage(res, 500, "Internal server error", {
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return generateMessage(res, 400, "Email and new password are required");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return generateMessage(res, 404, "User not found");
    }

    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newPassword;

    await user.save();

    // Delete OTP after successful password reset
    await OTP.deleteOne({ email });

    return generateMessage(res, 200, "Password reset successfully");
  } catch (error) {
    return generateMessage(res, 500, "Internal server error", {
      error: error.message,
    });
  }
};

const getProfile = (req, res) => {
  return res.status(200).json({
    message: "User profile fetched successfully",
    user: req.user,
  });
};
module.exports = {
  signUp,
  login,
  getProfile,
  refreshAccessToken,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
