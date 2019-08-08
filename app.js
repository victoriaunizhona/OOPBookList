//  Book constuctor - creating book object
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor - things that have to be done in the UI
function UI() { };

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list")

  // Create tr element
  const row = document.createElement("tr");

  // Insert cosl

  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class = "delete" >X</a></td>
  `;

  list.appendChild(row);
}
// Show alert 
UI.prototype.showAlert = function (message, className) {
  // Create div
  const div = document.createElement("div");
  // add classes
  div.className = `alert ${className}`;

  // Add text
  div.appendChild(document.createTextNode(message));

  // Get parent
  const container = document.querySelector(".container");

  const form = document.querySelector("#book-form");
  // INsert alert
  container.insertBefore(div, form);

  // Timeout after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').remove();
  }, 3000);

}

// Delete Book

UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
}

// UI clear fields

UI.prototype.clearFields = function () {
  document.getElementById("book-form").reset();
}

// Even Listeners for add book

document.getElementById("book-form").addEventListener("submit", function (e) {

  // Get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  // Instantiating the book
  const book = new Book(title, author, isbn);

  // UI obj

  const ui = new UI();

  // Validate
  if (title === '' || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to lsit
    ui.addBookToList(book);

    // Show success
    ui.showAlert('Book Added!', "success");

    // Clear fields

    ui.clearFields();
  }



  e.preventDefault();
})

// Event Listener for delete

document.getElementById("book-list").addEventListener("click", function (e) {

  const ui = new UI();
  ui.deleteBook(e.target);

  // Show an allert
  ui.showAlert("Book Removed", "success");

  e.preventDefault();
})