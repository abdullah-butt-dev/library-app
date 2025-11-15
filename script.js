const myLibrary = [];

function Book(id, title, author, pages, readStatus) {
  
  if(!new.target) {
    throw Error('Use new operator to create an object');
  }
  
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;

}


function addBookToLibrary(title, author, pages, readStatus) {

  const id = crypto.randomUUID();
  console.log(id);
  const book = new Book(id, title, author, pages, readStatus);
  console.log(book);

  myLibrary.push(book);
}

function displayBooks() {
  for(const book of myLibrary) {
    console.log(book.id);
    console.log(book.title);
    console.log(book.author);
    console.log(book.pages);
    console.log(book.readStatus);
  }
}

addBookToLibrary('The Murder of History', 'K.K.Aziz', 200, 'Yes')
addBookToLibrary('1986', 'George Orwell', 327, 'No')
addBookToLibrary('Ego is the enemy', 'Ryan Holiday', 180, 'No')
displayBooks();