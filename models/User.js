const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    address: { type: String, trim: true },
    contact: { type: String, trim: true },
    profession: { type: String, trim: true },
    password: { type: String, required: true },

    // Membership Type
    membershipType: {
      type: String,
      enum: ['general', 'patron', 'associate', 'supporter'],
      default: 'general',
      required: true,
    },

    // Payment Tracking, etc...
    membershipFee: { type: Number, default: 0 },
    membershipPaid: { type: Boolean, default: false },
    membershipPaidAt: { type: Date, default: null },

    donatedAmount: { type: Number, default: 0 },
    receipts: [
      {
        fileName: String,
        filePath: String,
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    // Account Locking and Status
    accountLocked: { type: Boolean, default: false },
    loginAttempts: { type: Number, default: 0 },
    loginLogs: [
      {
        timestamp: { type: Date, default: Date.now },
        ip: String,
        userAgent: String,
      },
    ],
    accountStatus: {
      type: String,
      enum: ['pending', 'active', 'suspended', 'deactivated', 'rejected'],
      default: 'pending',
    },

    // Account expiration date (null until set by admin)
    accountExpiry: {
      type: Date,
      default: null,
    },
    /**
     * Role
     * - 'user': normal user
     * - 'admin': has admin privileges
     * - 'superadmin': can promote other users to admin, etc.
     */
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);