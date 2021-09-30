let myLibrary = [];

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

function addBookToLibrary() {
  // do stuff here
}