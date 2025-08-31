const mongoose = require('mongoose'); 
const userSchema = new mongoose.Schema({
   role: { type: String, enum: ['admin','doctor','patient'], required: true }, 
   email: { type: String, required: true, unique: true }, 
   password: { type: String, required: true }, // hashed 
 }, { timestamps: true }); 
 
module.exports = mongoose.model('User', userSchema);