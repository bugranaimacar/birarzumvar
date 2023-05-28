const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const messagesRouter = require('./routes/messages');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');



process.env.jwtkey = '3f740e13ca01faafjk9m3lb2a1cad94db'; // Replace with your own secret key
const SALT = '864143b9d23423125da07f7203a068ad7'; // Replace with your own salt value


// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
// API endpoint router
app.use('/api', messagesRouter);


app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  const db = req.app.locals.db;
  const user = await db.collection('users').findOne({ username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
  const hashedPassword = crypto.createHash('sha256').update(password + SALT).digest('hex');
  if (hashedPassword !== user.password) {
    return res.status(401).json({ message: 'Invalid username or password' });
    }
  const token = jwt.sign({ userId: user._id, isAdmin: true, 'username': username }, process.env.jwtkey, { expiresIn: '1d' });
  res.json({ token });
});

// MongoDB connection
const connectToMongoDB = async () => {
  try {
    const client = await MongoClient.connect('mongodb+srv://');
    console.log('Connected to MongoDB');
    return client.db('birarzumvar');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

// Start the server after connecting to MongoDB
const startServer = async () => {
  const db = await connectToMongoDB();
  app.locals.db = db;
  app.listen(4000, () => {
    console.log('Server started on port 4000');
  });
};

startServer();
