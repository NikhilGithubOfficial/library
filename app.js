let myLibrary = [];

//Book class : Represents a book
class Book {
    constructor(title, author, pages, isRead) {
        // the constructor...
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.info = function () {
            if (isRead)
                return `${title} by ${author}, ${pages} pages, isRead.`;
            else
                return `${title} by ${author}, ${pages} pages, not isRead yet.`;
        };
    }
}

// UI class : Handles UI Tasks
class UI {
    static displayBooks() {
        const storedBooks = [
            {
                title : "Book one",
                author : "Luigi",
                pages : 69,
                isRead : 'on'
            },
            {
                title : "Book two",
                author : "Ash Ketchum",
                pages : 69,
                isRead : 'off'
            }
        ];

        const books = storedBooks;

        books.forEach((book) => UI.addBookToLibrary(book));
    }

    static addBookToLibrary(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.isRead}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#isRead').value = '';
    }
}

// Store class : Handles Storage

// Event : Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event : Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent Actual Submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const isRead = document.querySelector('#isRead').value;

    // Instantiate Book
    const book = new Book(title, author, pages, isRead);
    console.log(book);

    // Add Book to UI
    UI.addBookToLibrary(book);

    // Clear Fields
    UI.clearFields();
});

// Event : Delete a book