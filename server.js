const express = require('express');
const path = require('path');
const app = express();

const db = require('./db');

app.use(express.json());

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/people', async (req, res, next) => {
  res.send(await db.People.findAll());
});

app.get('/api/places', async (req, res, next) => {
  res.send(await db.Place.findAll());
});

app.get('/api/things', async (req, res, next) => {
  res.send(await db.Things.findAll());
});

const port = process.env.PORT || 3000;

db.seedAndSync().then(() => {
  app.listen(port, () => {
    `Listening on port ${port}`;
  });
});
