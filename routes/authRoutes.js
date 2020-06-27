const express = require('express');
const router = express.Router();
const controllerRoutes = require('../controllers/routes');

// TEST HOME ROUTE
router.get('/', controllerRoutes.home);

// REGISTER ROUTE
router.post('/register', controllerRoutes.register);

module.exports = router;
