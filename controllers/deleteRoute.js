const User = require('../models/userModel');

//DELETE POSTS
module.exports = {
  delete: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.user);
      res.json(`${deletedUser} DELETED`);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};
