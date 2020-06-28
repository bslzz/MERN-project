// importing user model from UserShema
const User = require('../models/userModel');

module.exports = {
  // ALL POSTS FROM MONGOOSE DB
  dbposts: async (req, res) => {
    User.find()
      .then((data) => res.json(data))
      .catch((error) => console.log(`Error fetching posts from DB: ${error}`));
  },
};
