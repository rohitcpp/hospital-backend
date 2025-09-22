const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log('Received Token:', token); // Debug token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded); // Debug decoded payload

      // Attach user to request
      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) {
        console.log('User not found for ID:', decoded.id); // Debug
        return res.status(401).json({ message: "User not found" });
      }
      console.log('Authenticated User:', req.user); // Debug user
      next();
    } catch (error) {
      console.log('Token Verification Error:', error.message); // Debug error
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token has expired" });
      }
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    console.log('No token provided in headers'); // Debug
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).json({ message: "User not authenticated" }); // Safeguard
    }
    if (!roles.includes(req.user.role)) {
      console.log('Unauthorized role:', req.user.role, 'Required roles:', roles); // Debug
      return res.status(403).json({ message: "You do not have permission to perform this action" });
    }
    next();
  };
};

module.exports = { protect, authorize };