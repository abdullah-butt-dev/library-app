const bookContainer = document.querySelector('.book-container');
const addBtn = document.querySelector('.add-btn');

const dialog = document.querySelector('.dialog');

const image = document.getElementById("book-image")
const name = document.getElementById("book-name")
const author = document.getElementById("book-author")
const pages = document.getElementById("book-pages")

const submitBtn = document.querySelector('.submit-btn');
const closeBtn = document.querySelector('.close');

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

Book.prototype.toggleReadStatus = function(cardReadElement) {
  
  if(this.readStatus == 'Yes') {
    this.readStatus = 'No';
  }
  else {
    this.readStatus = 'Yes';
  }

  cardReadElement.textContent = `Read: ${this.readStatus}`;

}

function addBookToLibrary(imageLink, title, author, pages, readStatus) {

  const id = crypto.randomUUID();
  const book = new Book(imageLink, id, title, author, pages, readStatus);
  myLibrary.push(book);

}

function removeBookFromLibrary(bookId) {
  const bookToRemove = document.querySelector(`.book-card[data-id="${bookId}"]`);
  bookToRemove.remove();
  const indexToRemove = myLibrary.findIndex(book => book.id === bookId);
  myLibrary.splice(indexToRemove, 1);
}

function displayBooks() {

  bookContainer.innerHTML = ``;

  for(const book of myLibrary) {

    bookContainer.innerHTML += `
      <div class="book-card" data-id=${book.id}>
          <div class="book-img">
            <img src="${book.imageLink}" alt="Book">
          </div>
          <div class="book-title">${book.title}</div>
          <div class="book-author">by ${book.author}</div>
          <div class="book-pages">Pages: ${book.pages}</div>
          <div class="book-readStatus">Read: ${book.readStatus}</div>
          <button class="remove-btn">Remove</button>
          <button class="mark-btn">${book.readStatus === "Yes" ? "Mark Unread" : "Mark Read"}</button>
      </div>
    `;

  }
    
  document.querySelectorAll('.remove-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.book-card');
      const bookId = card.dataset.id;
      removeBookFromLibrary(bookId);
    })
  })

  document.querySelectorAll('.mark-btn').forEach(button => {
    
    button.addEventListener('click', () => {
      
      const markBtn = button.closest('.mark-btn');
      
      if(markBtn.textContent == 'Mark Read') {
        markBtn.textContent = 'Mark Unread';
      }
      else {
        markBtn.textContent = 'Mark Read';
      }

      const card = button.closest('.book-card');
      const bookId = card.dataset.id;
      const indexOfBook = myLibrary.findIndex(book => book.id == bookId)
      const cardReadElement = card.children[4];
      myLibrary[indexOfBook].toggleReadStatus(cardReadElement);

    })

  })

}

addBookToLibrary('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpVv3FC9LXj1sr9EOOt-pmDcC3LaocHLT-XA&s', 'The Murder of History', 'K.K.Aziz', 200, 'Yes');
addBookToLibrary('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRGTbpydDXhx0pgNMlb480AbauiFjPziZdLQ&s', '1984', 'George Orwell', 327, 'No');
addBookToLibrary('https://readings-storage.s3.ap-south-1.amazonaws.com/images/9781591847816.webp', 'Ego is the enemy', 'Ryan Holiday', 180, 'No');
addBookToLibrary('https://m.media-amazon.com/images/I/81kg51XRc1L.jpg', 'Atomic Habits', 'James Clear', 320, 'Yes');
addBookToLibrary('https://www.penguinrandomhouse.co.za/sites/penguinbooks.co.za/files/cover/9780099590088.jpg', 'Sapiens: A Brief history of Humankind', 'Yuval Noah Harari', 443, 'No');
addBookToLibrary('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3sNoBdV-gCmgfq58BE6IlQ_fwkSZjD143FA&s', 'Think and Grow Rich', 'Napoleon Hill', 238, 'No');
addBookToLibrary('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ImvQ8AfMLWqt5ZZq7hatx_jK0avBr7ZJCw&s', 'The Psychology of Money', 'Morgan Housel', 256, 'No');

displayBooks();


addBtn.addEventListener('click', () => {
  dialog.showModal();
});

submitBtn.addEventListener('click', (event) => {

  const myForm = document.querySelector('.form');

  if(!myForm.checkValidity()) {
    return;
  }

  event.preventDefault();

  const imageValue = image.value;
  const nameValue = name.value;
  const authorValue = author.value;
  const pagesValue = pages.value;
  const readStatus = document.querySelector('input[name="read-status"]:checked');
  const readStatusValue = readStatus.value;

  myForm.reset();
  
  addBookToLibrary(imageValue, nameValue, authorValue, pagesValue, readStatusValue);
  
  displayBooks();
  

});

closeBtn.addEventListener('click', () => {
  dialog.close();
})


