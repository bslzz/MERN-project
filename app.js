const express = require('express');
const cors = require('cors');
// .env keys
require('dotenv').config();

//importing mongoose DB
require('./db/initMongoose');
const app = express();
// express middleware
app.use(express.json());
app.use(cors());

//test app route
app.get('/', (req, res) => {
  res.json('👍 Hello from express route');
});

// router routes
app.use('/users', require('./routes/authRoutes'));
app.use('/users', require('./routes/todoRoutes'));

// PORT setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
