let books = JSON.parse(localStorage.getItem('reading_list')) || [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', status: 'Completed' },
  { id: 2, title: 'Python Crash Course', author: 'Eric Matthes', status: 'Reading' },
  { id: 3, title: 'The Pragmatic Programmer', author: 'David Thomas', status: 'Wishlist' }
];

let activeFilter = 'all';

const form = document.getElementById('book-form');
const grid = document.getElementById('books-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function saveBooks() {
  localStorage.setItem('reading_list', JSON.stringify(books));
}

function renderBooks() {
  grid.innerHTML = '';
  const filtered = activeFilter === 'all' ? books : books.filter(b => b.status === activeFilter);

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:#64748b; grid-column: 1/-1;">No books in this category.</p>';
    return;
  }

  filtered.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';
    card.innerHTML = `
      <div>
        <h3>${book.title}</h3>
        <p class="author">by ${book.author}</p>
      </div>
      <div class="card-footer">
        <span class="badge ${book.status}">${book.status}</span>
        <button class="delete-btn" onclick="deleteBook(${book.id})" title="Delete">🗑️</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const author = document.getElementById('author').value.trim();
  const status = document.getElementById('status').value;

  if (!title || !author) return;

  books.push({
    id: Date.now(),
    title,
    author,
    status
  });

  saveBooks();
  renderBooks();
  form.reset();
});

window.deleteBook = function(id) {
  books = books.filter(b => b.id !== id);
  saveBooks();
  renderBooks();
};

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.getAttribute('data-filter');
    renderBooks();
  });
});

renderBooks();
