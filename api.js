const express = require('express');
const path = require('path');
const app = express();
const db = require('./db');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

app.get('/api/books/', (req, res) => {
  res.json(db.books);
});

app.post('/api/books/', (req, res) => {
  const { title, author, year, genre } = req.body;
  const newBook = {
    id: db.books.length + 1,
    title,
    author,
    year,
    genre,
  };
  db.books.push(newBook);
  res.status(201).json(newBook);
});

module.exports = { app };
