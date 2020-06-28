const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// importing user model from UserShema
const User = require('../models/userModel');

module.exports = {
  // HOME ROUTE
  home: async (req, res) => {
    res.json('Hellow from router route 🙏');
  },

  //REGISTER ROUTE
  register: async (req, res) => {
    try {
      let { email, password, confirm_password, displayName } = req.body;
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      //validation

      if (!email || !password || !confirm_password)
        return res.status(422).json({ msg: 'Email and Password required' });
      if (password.length < 5)
        return res
          .status(422)
          .json({ msg: 'Password must be at least 5 characters long' });
      if (password !== confirm_password)
        return res.status(422).json({ msg: 'Password not matched' });
      if (!email.match(mailformat))
        return res.status(422).json({ msg: 'Email not valid' });

      //finding if the user is stored in the DB

      const existingUser = await User.findOne({ email: email });
      if (existingUser)
        return res.status(422).json({ msg: 'User already exists' });

      if (!displayName) displayName = email;

      //hashing the password and savig new user to DB

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashedPassword,
        displayName,
      });
      const savedUser = await user.save();
      res.json(savedUser);
    } catch (error) {
      res.status(422).json(error.message);
    }
  },

  //LOGIN ROUTE
  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!email || !password)
        return res.status(422).json({ msg: 'Email and Password required' });
      if (!email.match(mailformat))
        return res.status(422).json({ msg: 'Email not valid' });

      // finding if the user is stored in the DB

      const savedUser = await User.findOne({ email });
      if (!savedUser)
        return res.status(422).json({ msg: 'User does not exist' });

      const matchPassword = await bcrypt.compare(password, savedUser.password);
      if (!matchPassword)
        return res.status(401).json({ msg: 'Invalid email/password' });
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

  dbposts: async (req, res) => {
    User.find().then((data) => res.json(data));
  },
};
