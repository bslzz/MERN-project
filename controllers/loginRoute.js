const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// importing user model from UserShema
const User = require('../models/userModel');

module.exports = {
  //LOGIN ROUTE
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      //validation
      if (!email || !password)
        return res.status(422).json({ msg: 'Email and Password required' });
      if (!email.match(mailformat))
        return res.status(422).json({ msg: 'Email not valid' });

      // finding if the user is stored in the DB
      const savedUser = await User.findOne({ email });
      if (!savedUser)
        return res.status(404).json({ msg: 'User does not exist' });

      const matchPassword = await bcrypt.compare(password, savedUser.password);
      if (!matchPassword)
        return res.status(404).json({ msg: 'Invalid email/password' });
      const token = await jwt.sign(
        { id: savedUser._id },
        process.env.SECRET_KEY
      );

      res.json({
        token,
        user: {
          id: savedUser._id,
          email: savedUser.email,
          displayName: savedUser.displayName,
        },
      });
    } catch (error) {
      res.status(422).json(error.message);
    }
  },
};
