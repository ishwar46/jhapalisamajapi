const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const register = async (req, res) => {
  try {
    const {
      fullname,
      email,
      userName,
      password,
      phoneNumber,
      officeNumber,
      organizationName,
      designation,
      role,
      status,
      profilePicture,
      address,
      preferences,
    } = req.body;

    // Validate required fields
    if (
      !fullname ||
      !email ||
      !userName ||
      !password ||
      !organizationName ||
      !designation
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required fields.",
      });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    // Check if user or username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "A user with this email already exists.",
      });
    }

    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({
        success: false,
        message: "Username already taken.",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user object
    const userData = new User({
      fullname,
      email,
      userName,
      password: hashedPassword,
      phoneNumber,
      officeNumber,
      organizationName,
      designation,
      role: role || "Customer",
      status: status || "active",
      profilePicture,
      address: address || {},
      preferences: preferences || { emailNotifications: true },
    });

    // Save user to database
    await userData.save();

    return res.status(201).json({
      success: true,
      user: {
        id: userData._id,
        fullname: userData.fullname,
        email: userData.email,
        userName: userData.userName,
        organizationName: userData.organizationName,
        designation: userData.designation,
        role: userData.role,
        status: userData.status,
      },
      message: "Registration successful.",
    });
  } catch (error) {
    console.error(`Error during registration: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "An error occurred during registration. Please try again later.",
    });
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;

  // Validate required fields
  if (!userName || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter both username and password.",
    });
  }

  try {
    // Find user by username
    const userData = await User.findOne({
      $or: [{ userName: userName }, { email: userName }]
    });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please check the username or email and try again.",
      });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // Generate payload for the token
    const payload = {
      id: userData._id,
      fullname: userData.fullname,
      userName: userData.userName,
      email: userData.email,
      isAdmin: userData.isAdmin,
      role: userData.role,
    };

    // Generate JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "6d",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: userData._id,
        fullname: userData.fullname,
        userName: userData.userName,
        email: userData.email,
        role: userData.role,
        isAdmin: userData.isAdmin,
      },
    });
  } catch (error) {
    console.error(`Error during login: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);
    if (!userData) {
      return res.status(400).send("User Not Found");
    }
    return res.status(200).json({
      success: true,
      userData,
      message: "Profile Fetched Successfully",
    });
  } catch (error) {
    console.log(`Error while Fetching Profile: ${error}`);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  register,
  login,
  getUserProfile,
};
