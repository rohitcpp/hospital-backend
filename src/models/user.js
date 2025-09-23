const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Auth fields
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/   // same validation as Doctor
  },
  password: { type: String, required: true },

  role: { 
    type: String, 
    required: true, 
    enum: ['admin', 'doctor'] 
  },

  // Doctor-specific fields (optional for admins)
  name: { type: String },
  phno: { 
    type: String,
    match: /^[0-9]{10}$/   // same 10-digit phone validation
  },
  spec: { type: String },
  dept: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Department' 
  },
  exp: { type: String },
  qual: { type: String },
  status: { 
    type: String, 
    enum: ['Active', 'Inactive'], 
    default: 'Active' 
  }
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
