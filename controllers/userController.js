const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const isValidEmail = require("../utils/Validators");
const { sendEmail } = require("../middleware/nodeMailer");

const MAX_LOGIN_ATTEMPTS = 5;
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

/**
 * Register a new user
 * POST /api/register
 */
exports.register = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      contact,
      profession,
      password,
      membershipType,
      city,
      state,
      canReceiveText,
      hasSpouse,
      spouse,
      familyMembers,
    } = req.body;

    // Validate required fields
    const errors = {};
    if (!fullName || fullName.trim() === "") {
      errors.fullName = "Full Name is required.";
    }
    if (!username || username.trim() === "") {
      errors.username = "Username is required.";
    }
    if (!email || email.trim() === "") {
      errors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!state || state.trim() === "") {
      errors.state = "State is required.";
    }
    if (!contact || contact.trim() === "") {
      errors.contact = "Contact is required.";
    }
    if (!profession || profession.trim() === "") {
      errors.profession = "Profession is required.";
    }
    if (!password) {
      errors.password = "Password is required.";
    }

    // If any errors, return 400 Bad Request with details
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or Email already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with additional fields
    const user = new User({
      fullName,
      username,
      email,
      contact,
      profession,
      password: hashedPassword,
      membershipType: membershipType || "general",
      city: city && city !== "Other" ? city : state,
      state: state || "",
      canReceiveText: canReceiveText || "false",
      hasSpouse: hasSpouse === "yes" || hasSpouse === true,
      spouse: spouse ? spouse : null,
      // familyMembers: familyMembers ? JSON.parse(familyMembers) : [],
      familyMembers:
        typeof familyMembers === "string"
          ? JSON.parse(familyMembers) // If it's a string, parse it
          : Array.isArray(familyMembers)
          ? familyMembers // Keep it as is if it's already an array
          : Object.values(familyMembers) || [],
    });

    await user.save();
    await sendEmail({
      from: "Jhapa <jhapalisamaj@gmail.com>",
      to: email,
      subject: "My first system email",
      html: `<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f7fc;
      }
      .container {
        max-width: 600px;
        margin: 50px auto;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }
      .logo {
        text-align: center;
        margin-bottom: 20px;
      }
      .logo img {
        width: 200px;
        height: auto;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
      .banner {
        background-color: #f97316; /* Orange-400 */
        text-align: center;
        padding: 15px 0;
        color: white;
        border-radius: 8px 8px 0 0;
      }
      .header h1 {
        font-size: 36px;
        margin: 0;
      }
      .message {
        font-size: 18px;
        color: #333;
        margin: 20px 0;
        text-align: center;
      }
      .highlight {
        color: #16a34a; /* Green-700 */
        font-weight: bold;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        color: #777;
        margin-top: 20px;
      }
      .footer a {
        color: #f97316; /* Orange-400 */
        text-decoration: none;
      }
      .footer a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img src="https://jhapali.org/wp-content/uploads/2020/09/cropped-logo-5.png" alt="Logo">
      </div>
      <div class="banner">
        <h1>Welcome to Jhapali Samaj!</h1>
      </div>
      <div class="message">
        <p>Congratulations, your registration was successful!</p>
        <p><strong>Username:</strong> <span class="highlight">${username}</span></p>
        <p><strong>Email:</strong> <span class="highlight">${email}</span></p>
        <p><strong>Password:</strong><span class="highlight">${password}</span></p>
      </div>
      <div class="footer">
        <p>If you did not register, please contact support.</p>
        <p><a href="https://example.com">Visit our website</a></p>
      </div>
    </div>
  </body>
</html>
`,
    });
    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        membershipType: user.membershipType,
        accountStatus: user.accountStatus,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res
      .status(500)
      .json({ error: "Server error while registering user." });
  }
};

/**
 * User Login
 * POST /api/login
 */
exports.login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Validate required fields
    if (!usernameOrEmail || !password) {
      return res.status(400).json({
        success: false,
        error: "Username/email and password are required.",
      });
    }

    // Find the user by username or email
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials.",
      });
    }

    if (user.accountExpiry && user.accountExpiry < new Date()) {
      return res.status(403).json({
        success: false,
        error: "Your membership has expired. Please renew or contact admin.",
      });
    }

    // Check if account is locked or inactive
    if (
      user.accountStatus === "suspended" ||
      user.accountStatus === "deactivated"
    ) {
      return res.status(403).json({
        success: false,
        error: `Account is ${user.accountStatus}. Please contact support.`,
      });
    }

    if (user.accountLocked) {
      return res.status(403).json({
        success: false,
        error:
          "Account is locked due to too many failed logins. Please Contact Admin.",
      });
    }

    // Compare provided password with stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // Increment login attempts and lock account if threshold is reached
      user.loginAttempts += 1;
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.accountLocked = true;
      }
      await user.save();
      return res.status(401).json({
        success: false,
        error: "Invalid credentials.",
        attemptsRemaining: MAX_LOGIN_ATTEMPTS - user.loginAttempts,
      });
    }

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.accountLocked = false;

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Record the login log with IP and user agent
    user.loginLogs.push({
      ip: req.ip || req.connection.remoteAddress,
      userAgent: req.headers["user-agent"] || "unknown",
    });
    await user.save();

    // Success response
    return res.status(200).json({
      success: true, // Added success field
      message: "Login successful.",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        membershipType: user.membershipType,
        accountStatus: user.accountStatus,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    // Error response
    return res.status(500).json({
      success: false,
      error: "Server error while logging in.",
    });
  }
};

/**
 * Get User Profile
 * GET /api/profile
 * Requires JWT authentication (middleware should set req.userId)
 */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password -__v");
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res
      .status(500)
      .json({ error: "Server error while fetching profile." });
  }
};

/**
 * User Profile
 * PATCH /api/profile
 * Requires JWT authentication (middleware should set req.userId)
 */

exports.updateProfile = async (req, res) => {
  try {
    // The userId is set by authMiddleware (JWT decode)
    const userId = req.userId;

    // Accept the fields they may want to update
    const { fullName, address, contact, profession } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update only allowable fields
    if (typeof fullName !== "undefined") user.fullName = fullName.trim();
    if (typeof address !== "undefined") user.address = address.trim();
    if (typeof contact !== "undefined") user.contact = contact.trim();
    if (typeof profession !== "undefined") user.profession = profession.trim();

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        address: user.address,
        contact: user.contact,
        profession: user.profession,
      },
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({
      error: "Server error while updating profile.",
    });
  }
};
