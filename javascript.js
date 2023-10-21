const myLibrary = [];

const addBookBtn = document.querySelector("#addBookBtn");
const addBookModal = document.querySelector("#addBookModal");
const addBookForm = document.querySelector("#addBookForm");
const overlay = document.querySelector("#overlay");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    return this.read = !this.read;
  }
}

function addBookToLibrary() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  render();
  addBookModal.classList.remove("active");
  overlay.classList.remove("active");
}

addBookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  addBookToLibrary();
});

addBookBtn.addEventListener("click", function () {
  addBookForm.reset();
  addBookModal.classList.add("active");
  overlay.classList.add("active");
});

function removeBook(index) {
  myLibrary.splice(index, 1);
  render();
}

function toggleRead(index) {
  myLibrary[index].toggleRead();
  render();
}

function render() {
  const booksGrid = document.querySelector(".books-grid");
  booksGrid.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const bookCard = document.createElement("div");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const buttonGroup = document.createElement("div");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    bookCard.classList.add("book-card");
    buttonGroup.classList.add("button-group");
    readBtn.classList.add("btn", "readToggle");
    removeBtn.classList.add("btn");

    readBtn.setAttribute("onclick", `toggleRead(${i})`);
    removeBtn.setAttribute("onclick", `removeBook(${i})`);

    title.textContent = `"${book.title}"`;
    author.textContent = book.author;
    pages.textContent = `${book.pages} pages`;
    removeBtn.textContent = "Remove";

    if (book.read) {
      readBtn.textContent = "Read";
      readBtn.classList.add("btn-light-green");
    } else {
      readBtn.textContent = "Not read";
      readBtn.classList.add("btn-light-red");
    }

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    buttonGroup.appendChild(readBtn);
    buttonGroup.appendChild(removeBtn);
    bookCard.appendChild(buttonGroup);
    booksGrid.appendChild(bookCard);
  }
}

function closeAddBookModal() {
  addBookModal.classList.remove("active");
  overlay.classList.remove("active");
}

const handleKeyboardInput = (e) => {
  if (e.key === "Escape") closeAddBookModal();
};

window.onkeydown = handleKeyboardInput;
overlay.onclick = closeAddBookModal;
