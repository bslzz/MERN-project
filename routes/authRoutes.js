const express = require('express');
const router = express.Router();
const loginRoute = require('../controllers/loginRoute');
const registerRoute = require('../controllers/registerRoute');
const allpostsRoute = require('../controllers/allpostsRoute');
const requireLogin = require('../authentication/requireLogin');

// TEST HOME ROUTE
router.get('/', requireLogin, async (req, res) => {
  res.json('Hellow from router route 🙏');
});

// REGISTER ROUTE
router.post('/register', registerRoute.register);

//LOGIN ROUTE
router.post('/login', loginRoute.login);

//DB POSTS
router.get('/dbposts', allpostsRoute.dbposts);

module.exports = router;
