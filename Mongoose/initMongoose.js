const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const db = mongoose.connection;

db.on('connected', () => console.log('Connected to DB'));
db.on('error', (err) => console.log(`Error connecting to DB: ${err}`));
db.on('disconnected', () => console.log(' DB disconnected'));

//SIGINI is for the signal
process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});
