const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ['admin','doctor','patient'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
