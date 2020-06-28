const express = require('express');
const router = express.Router();
const loginRoute = require('../controllers/loginRoute');
const registerRoute = require('../controllers/registerRoute');
const allpostsRoute = require('../controllers/allpostsRoute');
const deleteRoute = require('../controllers/deleteRoute');
const isvalidtoken = require('../controllers/validToken');
const requireLogin = require('../authentication/requireLogin');
const User = require('../models/userModel');

// REGISTER ROUTE
router.post('/register', registerRoute.register);

//LOGIN ROUTE
router.post('/login', loginRoute.login);

//DB POSTS
router.get('/dbposts', allpostsRoute.dbposts);

//DELETE POSTS FROM DB ROUTE
router.delete('/delete', requireLogin, deleteRoute.delete);

//CHECK IF TOKEN IS VALID
router.post('/token', isvalidtoken.validtoken);

// FIND LOGGED IN USER
router.get('/', requireLogin, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    id: user._id,
    displayName: user.displayName,
  });
});

module.exports = router;
