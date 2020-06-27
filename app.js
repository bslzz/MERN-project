const express = require('express');
const app = express();
// .env keys
require('dotenv').config();

//importing mongoose DB
require('./Mongoose/initMongoose');

// express middleware
app.use(express.json());

//test app route
app.get('/', (req, res) => {
  res.json('👍 Hello from express route');
});

// PORT setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
