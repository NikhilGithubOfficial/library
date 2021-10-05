let myLibrary = [];

//Book class : Represents a book
class Book {
    constructor(serial, title, author, pages, isRead) {
        // the constructor...
        this.serial = serial;
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
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToLibrary(book));
    }

    static addBookToLibrary(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.serial}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.isRead}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        // Vanish in 2 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
    }

    static clearFields() {
        document.querySelector('#serial').value = '';
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#isRead').value = '';
    }
}

// Store class : Handles Storage
class Store{
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('book', JSON.stringify('books'));
    }

    static removeBook(book) {
        const books = Store.getBooks();
        books.forEach((book, index) => {
            if(book.serial === serial) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event : Display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event : Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent Actual Submit
    e.preventDefault();

    // Get form values
    const serial = document.querySelector('#serial').value;
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const isRead = document.querySelector('#isRead').value;

    // Valserialate
    if(serial === '' || title === '' || author === '' || pages === ''){
        UI.showAlert('Please fill all fields', 'danger');
    }
    else {
        // Instantiate Book
        const book = new Book(serial, title, author, pages, isRead);
        console.log(book);

        // Add Book to UI
        UI.addBookToLibrary(book);

        // Add Book to Store
        Store.addBook(book);

        // Book add success
        UI.showAlert('Book Added', 'success');

        // Clear Fields
        UI.clearFields();
    }
});

// Event : Delete a book
document.querySelector('#book-list').addEventListener('click' , (e) => {
    UI.deleteBook(e.target);

    // Book remove success
    UI.showAlert('Book Removed', 'success');
})
