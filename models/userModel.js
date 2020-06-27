const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
  },
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
