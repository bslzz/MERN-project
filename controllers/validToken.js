// checking if the token is valid or not
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = {
  validtoken: async (req, res) => {
    try {
      const token = req.header('Authorization');
      if (!token) return res.json(false);
      const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
      if (!verifiedUser) return res.json(false);
      const user = await User.findById(verifiedUser.id);
      if (!user) return res.json(false);
      return res.json(true);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
