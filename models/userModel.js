const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: false,
      trim: true,
    },
    officeNumber: {
      type: String,
      required: false,
      trim: true,
    },
    organizationName: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["Admin", "Support Staff", "Customer"],
      default: "Customer",
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "suspended", "deactivated"],
      default: "active",
      trim: true,
    },
    profilePicture: {
      type: String,
      required: false,
      trim: true,
    },
    lastLogin: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
      trim: true,
    },
    resetPasswordExpires: {
      type: Date,
    },
    is2FAEnabled: {
      type: Boolean,
      default: false,
    },
    twoFactorCode: {
      type: String,
      trim: true,
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      postalCode: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    preferences: {
      emailNotifications: { type: Boolean, default: true },
      smsNotifications: { type: Boolean, default: false },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
