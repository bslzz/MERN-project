const express = require('express');
const app = express();
// .env keys
require('dotenv').config();

//importing mongoose DB
require('./db/initMongoose');

// express middleware
app.use(express.json());

//test app route
app.get('/', (req, res) => {
  res.json('👍 Hello from express route');
});

// router routes
app.use('/users', require('./routes/authRoutes'));

// PORT setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
