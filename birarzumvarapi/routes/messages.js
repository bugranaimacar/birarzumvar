const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function getTokenFromBearerToken(authorizationHeader) {
  if (!authorizationHeader) {
    return null;
  }

  const parts = authorizationHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}

function verifyToken(req, res, next) {
  const authorizationHeader = req.headers.authorization;
  const token = getTokenFromBearerToken(authorizationHeader);

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtkey);
    if (!decoded.isAdmin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Unauthorized' });
  }
}

router.post('/messages', async (req, res) => {
  const db = req.app.locals.db;
  const { name, surname, email, age, details, acceptTerms } = req.body;

  try {
    const intAge = parseInt(age) == 0;

    if (isNaN(intAge)) {
      return res.status(400).json({ message: 'Invalid age' });
    }

    const result = await db.collection('messages').insertOne({
      name,
      surname,
      age: intAge,
      email,
      details,
      acceptTerms,
      createdAt: new Date(),
    });
    const insertedDocument = await db.collection('messages').findOne({
      _id: result.insertedId,
    });
    res.json({ message: 'Message saved successfully', data: insertedDocument });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while saving the message.' });
  }
});

router.get('/messages/getrandom', async (req, res) => {
  const { age, email } = req.query;
  const db = req.app.locals.db;

  try {
    const cursor = db.collection('messages').aggregate([{ $sample: { size: 12 } }]);

    const messages = await cursor.toArray();
    messages.forEach(message => {
      message.surname = '';
      message.email = '-';
      message.age = '-';
    });

    res.json({
      messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/messages', verifyToken, async (req, res) => {
  const { age, name, email } = req.query;
  const db = req.app.locals.db;

  try {
    const cursor = db.collection('messages').find();

    if (age) {
      cursor.filter({ age: parseInt(age) });
    }

    if (name) {
      cursor.filter({ name: { $regex: name, $options: 'i' } });
    }

    if (email) {
      cursor.filter({ email: { $regex: email, $options: 'i' } });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;
    const messages = await cursor
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
    const totalMessages = await db.collection('messages').count();
    const totalPages = Math.ceil(totalMessages / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;
    const prevPage = hasPrevPage ? page - 1 : null;
    res.json({
      messages,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;