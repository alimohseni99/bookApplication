function fetchBooks() {
  fetch('/api/books/')
    .then((response) => response.json())
    .then((books) => {
      const container = document.querySelector('.container');
      container.innerHTML = '';

      books.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('books');
        bookDiv.innerHTML = `
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Year:c ${book.year}</p>
          <p>Genre: ${book.genre}</p>
        `;
        container.appendChild(bookDiv);
      });
    })
    .catch((error) => {
      console.error('Error fetching books:', error);
    });
}
function addBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const genre = document.getElementById('genre').value;

  fetch('/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, author, year, genre }),
  })
    .then((response) => response.json())
    .then((book) => {
      console.log('Book added:', book);
      alert('Book added successfully!');
      fetchBooks();
    })
    .catch((error) => {
      alert('Error adding book:', error);
      console.error('Error adding book:', error);
    });
}
const addBtn = document.getElementById('addBookBtn');
if (addBtn) {
  addBtn.addEventListener('click', addBook);
}
window.onload = fetchBooks;
