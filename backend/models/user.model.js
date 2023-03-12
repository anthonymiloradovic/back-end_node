const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  seller: { type: Boolean, default: false },
  seller_description: { type: String },
  seller_email: { type: String },
  seller_phone: { type: String },
  token: { type: String },
  lastLogin: { type: Date },
  isLoggedIn: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
