class Book {
  constructor(title, author, isbn, status = "доступна") {
    this.title = title; //
    this.author = author;
    this.isbn = isbn;
    this.status = status;
  }
  // Изменение статуса
  setStatus(status) {
    this.status = status;
  }
}

class Library {
  constructor() {
    this.books = [];
  }
  // Добавления книг в массив
  addBook = (book) => {
    this.books.push(book);
  };
  // Изменить статус на взята
  borrowBook = (isbn) => {
    let index = this.books.find((item) => item.isbn == isbn);
    return index.setStatus("взята");
  };
  // Изменить статус на доступна
  returnBook = (isbn) => {
    let index = this.books.find((item) => item.isbn == isbn);
    return index.setStatus("доступна");
  };
  // Показ название книги, которые доступны
  listAvailableBooks = () => {
    this.books.forEach((item) => {
      if (item.status === "доступна") {
        console.log(item.title);
      }
    });
  };
}

const book1 = new Book("Harry Potter", "Джо Роулинг", "10");
const book2 = new Book("Властелин колец", "Толкин", "11");
const book3 = new Book("Великий Гэтсби", "Гелмор", "12");
const show = new Library();

show.addBook(book1);
show.addBook(book2);
show.addBook(book3);

show.borrowBook(12);
show.returnBook(12);
show.listAvailableBooks();
