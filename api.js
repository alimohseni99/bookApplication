const express = require('express');
const path = require('path');
const fs = require('fs');
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

  const updatedDbContent = `
const books = ${JSON.stringify(db.books, null, 2)};

module.exports = { books };
  `;

  fs.writeFile(path.join(__dirname, 'db.js'), updatedDbContent, (err) => {
    if (err) {
      console.error('Error writing to db.js:', err);
      return res
        .status(500)
        .json({ error: 'Failed to save the book to the database' });
    }

    res.status(201).json(newBook);
  });
});

app.patch('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, year, genre } = req.body;
  const book = db.books.find((book) => book.id === parseInt(id));
});

app.delete('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const bookIndex = db.books.findIndex((book) => book.id === parseInt(id));

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  const deletedBook = db.books.splice(bookIndex, 1);

  const updatedDbContent = `
  const books = ${JSON.stringify(db.books, null, 2)};
  module.exports = { books };
  `;
  fs.writeFile(path.join(__dirname, 'db.js'), updatedDbContent, (err) => {
    if (err) {
      console.error('Error writing to db.js:', err);
      return res
        .status(500)
        .json({ error: 'Failed to change the book to the database' });
    }
    res.status(200).json(deletedBook[0]);
  });
});

module.exports = { app };
