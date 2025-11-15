const bookContainer = document.querySelector('.book-container');
const myLibrary = [];

function Book(imageLink, id, title, author, pages, readStatus) {
  
  if(!new.target) {
    throw Error('Use new operator to create an object');
  }
  
  this.imageLink = imageLink;
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;

}


function addBookToLibrary(imageLink, title, author, pages, readStatus) {

  const id = crypto.randomUUID();
  const book = new Book(imageLink, id, title, author, pages, readStatus);
  myLibrary.push(book);

}

function displayBooks() {
  for(const book of myLibrary) {

    bookContainer.innerHTML += `
      <div class="book-card">
          <div class="book-img">
            <img src="${book.imageLink}" alt="Book">
          </div>
          <div class="book-title">${book.title}</div>
          <div class="book-author">by ${book.author}</div>
          <div class="book-pages">Pages: ${book.pages}</div>
          <div class="book-readStatus">Read: ${book.readStatus}</div>
          <button class="remove-btn">Remove</button>
          <button class="mark-btn">Mark Read</button>
      </div>
    `;

  }
}

addBookToLibrary('https://razarumi.com/wp-content/uploads/2022/03/the-murder-of-history-600x600-1.png', 'The Murder of History', 'K.K.Aziz', 200, 'Yes');
addBookToLibrary('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRGTbpydDXhx0pgNMlb480AbauiFjPziZdLQ&s', '1984', 'George Orwell', 327, 'No');
addBookToLibrary('https://readings-storage.s3.ap-south-1.amazonaws.com/images/9781591847816.webp', 'Ego is the enemy', 'Ryan Holiday', 180, 'No');
displayBooks();