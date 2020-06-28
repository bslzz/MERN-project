const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireLogin = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token)
      return res.status(401).json({ msg: 'Unauthorized token, Access denied' });

    const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
    if (!verifiedUser)
      return res.status(401).json({ msg: 'Unauthorized User, Access denied' });
    req.user = verifiedUser.id;
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = requireLogin;
