const mongoose = require('mongoose');

  const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'doctor'] },
  });

  module.exports = mongoose.models.User || mongoose.model('User', userSchema);