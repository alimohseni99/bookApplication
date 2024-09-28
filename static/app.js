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

          <h3>${book.title}: ${book.id}</h3>
          <p>Author: ${book.author}</p>
          <p>Year:c ${book.year}</p>
          <p>Genre: ${book.genre}</p>
         <i class="material-icons deleteBtn" data-id="${book.id}">delete</i> 

        `;
        container.appendChild(bookDiv);
      });
    })
    .catch((error) => {
      console.error('Error fetching books:', error);
    });
}

//delete functionallity
const container = document.querySelector('.container');
container.addEventListener('click', function (event) {
  if (event.target.classList.contains('deleteBtn')) {
    const bookId = event.target.getAttribute('data-id');
    fetch(`/api/books/${bookId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((book) => {
        console.log('Book deleted:', book);
        alert('Book deleted successfully!');
        fetchBooks();
      })
      .catch((error) => {
        alert('Error deleting book:', error);
        console.error('Error deleting book:', error);
      });
  }
});
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

function updateBook() {
  const bookId = document.getElementById('bookId').value;
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const genre = document.getElementById('genre').value;

  fetch(`/api/books/${bookId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, author, year, genre }),
  })
    .then((response) => response.json())
    .then((book) => {
      console.log('Book updated:', book);
      alert('Book updated successfully!');
      fetchBooks();
    })
    .catch((error) => {
      alert('Error updating book:', error);
      console.error('Error updating book:', error);
    });

  const updateBtn = document.getElementById('updateBookBtn');
  if (updateBtn) {
    updateBtn.addEventListener('click', updateBook);
  }
}
window.onload = fetchBooks;
