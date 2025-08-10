const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).json({ message: 'username and password required' });

    const user = await User.findOne({ username });
    if(!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h' });

    res.json({ token, role: user.role });
  } catch (err) {
    next(err);
  }
};
