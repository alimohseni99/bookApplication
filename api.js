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

app.patch('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, year, genre } = req.body;
  const book = db.books.find((book) => book.id === parseInt(id));
  if (title) {
    book.title = title;
  }
  if (author) {
    book.author = author;
  }
  if (year) {
    book.year = year;
  }
  if (genre) {
    book.genre = genre;
  }
  res.json(book);
});

module.exports = { app };
