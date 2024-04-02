
const unfinishedBookshelf = document.getElementById("unfinished-bookshelf");
const finishedBookshelf = document.getElementById("finished-bookshelf");
const addBookForm = document.getElementById("add-book-form");


let books = [];


function renderBook(book) {
  const li = document.createElement("li");
  li.id = book.id;
  li.classList.add("book");
  li.innerHTML = `
    <span class="title">${book.title}</span>
    <span class="author">(${book.author})</span>
    <span class="year">${book.year}</span>
    <button class="delete">Hapus</button>
    <button class="move">${book.isComplete ? 'Pindahkan ke Belum Selesai Dibaca' : 'Pindahkan ke Selesai Dibaca'}</button>
  `;

  const deleteButton = li.querySelector(".delete");
  const moveButton = li.querySelector(".move");

  deleteButton.addEventListener("click", () => {
    deleteBook(book.id);
  });

  moveButton.addEventListener("click", () => {
    moveBook(book.id, book.isComplete);
  });

  if (book.isComplete) {
    finishedBookshelf.appendChild(li);
  } else {
    unfinishedBookshelf.appendChild(li);
  }
}

function addBookToList(book) {
  books.push(book);
  renderBook(book);
  updateStorage();
}


function addBook(event) {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const year = document.getElementById("year").value;
  const isComplete = document.getElementById("isComplete").checked;

  const id = +new Date();
  const book = { id, title, author, year, isComplete };

  addBookToList(book);
  addBookForm.reset();
}

function deleteBook(id) {
  const bookIndex = books.findIndex(book => book.id === id);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    document.getElementById(id).remove();
    updateStorage();
  }
}


function moveBook(id, isComplete) {
  const bookElement = document.getElementById(id);
  if (bookElement) {
    if (isComplete) {
      unfinishedBookshelf.appendChild(bookElement);
      isComplete = false;
    } else {
      finishedBookshelf.appendChild(bookElement);
      isComplete = true;
    }
    const book = books.find(book => book.id === id);
    if (book) {
      book.isComplete = isComplete;
      updateStorage();
    }
  }
}


function updateStorage() {
  localStorage.setItem("books", JSON.stringify(books));
}

const storedBooks = localStorage.getItem("books");
if (storedBooks) {
  books = JSON.parse(storedBooks);
  books.forEach(book => renderBook(book));
}

addBookForm.addEventListener("submit", addBook);
