const express = require('express');
const router = express.Router();
const loginRoute = require('../controllers/loginRoute');
const registerRoute = require('../controllers/registerRoute');
const allpostsRoute = require('../controllers/allpostsRoute');
const deleteRoute = require('../controllers/deleteRoute');
const isvalidtoken = require('../controllers/validToken');
const requireLogin = require('../authentication/requireLogin');

// TEST HOME ROUTE
router.get('/', async (req, res) => {
  res.json('Hellow from router route 🙏');
});

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

module.exports = router;
