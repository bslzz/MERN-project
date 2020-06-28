const express = require('express');
const router = express.Router();
const controllerRoutes = require('../controllers/routes');
const User = require('../models/userModel');

// TEST HOME ROUTE
router.get('/', controllerRoutes.home);

// REGISTER ROUTE
router.post('/register', controllerRoutes.register);

//LOGIN ROUTE
router.post('/login', controllerRoutes.login);

//DB POSTS
router.get('/dbposts', controllerRoutes.dbposts);

module.exports = router;
