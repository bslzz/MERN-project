const bcrypt = require('bcryptjs');

// importing user model from UserShema
const User = require('../models/userModel');

module.exports = {
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
};
