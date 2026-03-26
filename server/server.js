
const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
const User     = require('./UserSchema');
require('dotenv').config();

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(express.json());
app.use(cors());

// ── MongoDB Connection ──────────────────────────────────────
const mongoString = process.env.MONGO_URI || 'mongodb://localhost:27017/college_cache';
mongoose.connect(mongoString);

const database = mongoose.connection;
database.on('error', (error) => console.log(error));
database.once('connected', () => console.log('Database Connected'));

// ── POST /createUser ────────────────────────────────────────
// Creates a new user document in the users collection
app.post('/createUser', async (req, res) => {
  console.log(`SERVER: CREATE USER REQ BODY: ${req.body.username} ${req.body.firstName} ${req.body.lastName}`);
  const un = req.body.username;

  try {
    User.exists({ username: un }).then(result => {
      if (Object.is(result, null)) {
        // Username does not exist — create new user
        const user = new User(req.body);
        user.save();
        console.log(`User created! ${user}`);
        res.send(user);
      } else {
        console.log('Username already exists');
        res.status(500).send('Username already exists');
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// ── GET /getUser ────────────────────────────────────────────
// Checks username exists and matches password
app.get('/getUser', async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  console.log(username);
  console.log(password);

  try {
    const user = await User.findOne({ username, password });
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// ── Start Server ────────────────────────────────────────────
app.listen(9000, () => {
  console.log('Server Started at ${9000}');   // matches professor's exact log message
});