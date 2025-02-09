const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const MAX_LOGIN_ATTEMPTS = 5;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

// Simple email validator
const validateEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

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
      address,
      contact,
      profession,
      password,
      membershipType,
      nepalAddress,
      usCity,
      usState,
      canReceiveText,
      hasSpouse,
      spouse,
      familyMembers
    } = req.body;

    // Validate required fields
    const errors = {};
    if (!fullName || fullName.trim() === '') {
      errors.fullName = 'Full Name is required.';
    }
    if (!username || username.trim() === '') {
      errors.username = 'Username is required.';
    }
    if (!email || email.trim() === '') {
      errors.email = 'Email is required.';
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!address || address.trim() === '') {
      errors.address = 'Address is required.';
    }
    if (!contact || contact.trim() === '') {
      errors.contact = 'Contact is required.';
    }
    if (!profession || profession.trim() === '') {
      errors.profession = 'Profession is required.';
    }
    if (!password) {
      errors.password = 'Password is required.';
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
        .json({ error: 'Username or Email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with additional fields
    const user = new User({
      fullName,
      username,
      email,
      address,
      contact,
      profession,
      password: hashedPassword,
      membershipType: membershipType || 'general',
      nepalAddress: nepalAddress || "",
      usCity: usCity || "",
      usState: usState || "",
      canReceiveText: canReceiveText === "yes" || canReceiveText === true,
      hasSpouse: hasSpouse === "yes" || hasSpouse === true,
      spouse: hasSpouse === "yes" || hasSpouse === true ? spouse : null,
      familyMembers: familyMembers ? JSON.parse(familyMembers) : []
    });

    await user.save();

    return res.status(201).json({
      message: 'User registered successfully.',
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
    console.error('Register Error:', error);
    return res
      .status(500)
      .json({ error: 'Server error while registering user.' });
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
        error: 'Username/email and password are required.',
      });
    }

    // Find the user by username or email
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    if (user.accountExpiry && user.accountExpiry < new Date()) {
      return res.status(403).json({
        error: 'Your membership has expired. Please renew or contact admin.',
      });
    }

    // Check if account is locked or inactive
    if (
      user.accountStatus === 'suspended' ||
      user.accountStatus === 'deactivated'
    ) {
      return res.status(403).json({
        error: `Account is ${user.accountStatus}. Please contact support.`,
      });
    }
    if (user.accountLocked) {
      return res
        .status(403)
        .json({ error: 'Account is locked due to too many failed logins. Please Contact Admin.' });
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
        error: 'Invalid credentials.',
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
      userAgent: req.headers['user-agent'] || 'unknown',
    });
    await user.save();

    return res.status(200).json({
      message: 'Login successful.',
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
    console.error('Login Error:', error);
    return res
      .status(500)
      .json({ error: 'Server error while logging in.' });
  }
};

/**
 * Get User Profile (Protected Route Example)
 * GET /api/profile
 * Requires JWT authentication (middleware should set req.userId)
 */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('-password -__v');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error('Get Profile Error:', error);
    return res
      .status(500)
      .json({ error: 'Server error while fetching profile.' });
  }
};

/**
 * Get User Profile (Protected Route Example)
 * PATCH /api/profile
 * Requires JWT authentication (middleware should set req.userId)
 */

exports.updateProfile = async (req, res) => {
  try {
    // The userId is set by authMiddleware (JWT decode)
    const userId = req.userId;

    // Accept the fields they may want to update
    const {
      fullName,
      address,
      contact,
      profession,

    } = req.body;

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Update only allowable fields
    if (typeof fullName !== 'undefined') user.fullName = fullName.trim();
    if (typeof address !== 'undefined') user.address = address.trim();
    if (typeof contact !== 'undefined') user.contact = contact.trim();
    if (typeof profession !== 'undefined') user.profession = profession.trim();

    await user.save();

    return res.status(200).json({
      message: 'Profile updated successfully',
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
    console.error('Update Profile Error:', error);
    return res.status(500).json({
      error: 'Server error while updating profile.',
    });
  }
};