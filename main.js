const $ = (selector) => document.querySelector(selector);
const on = (el, event, handler) => el.addEventListener(event, handler);
function delegate(parent, selector, eventType, handler) {
  parent.addEventListener(eventType, (e) => {
    const target = e.target.closest(selector);
    if(target) handler(e, target);
  })
}

const bookContainer = $('.book-container');
const addBtn = $('.add-btn');
const dialog = $('.dialog');
const submitBtn = $('.submit-btn');
const closeBtn = $('.close');

class Book {

  constructor(src, title, author, pages, readStatus) {
    this.id = crypto.randomUUID();
    this.src = src;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
  }
  
  toggleRead() {
    this.readStatus = this.readStatus === 'Yes' ? 'No' : 'Yes';
  }

}

class Library {

  constructor (name) {
    this.name = name;
    this.books = [];
  }

  addBook(src, title, author, pages, readStatus) {
    const book = new Book(src, title, author, pages, readStatus);
    this.books.push(book);
  }

  removeBook(id) {
    this.books = this.books.filter(book => book.id !== id);
  }  

  getBook(id) {
    return this.books.find(book => book.id === id);
  }
  
  displayBooks() {
    
    let html = "";
    
    for(const book of this.books) {
      html += bookTemplate(book);
    }
    
    bookContainer.innerHTML = html;
  }

}

const bookTemplate = (book) => {
  const toggleText = book.readStatus === "Yes" ? "Mark Unread" : "Mark Read";

  return `
  <div class="book-card" data-id="${book.id}" data-read-status="${book.readStatus}">
  <div class="book-img">
  <img src="${book.src}" alt="${book.title}">
  </div>
  <div class="book-title">${book.title}</div>
  <div class="book-author">by ${book.author}</div>
  <div class="book-pages">Pages: ${book.pages}</div>
  <div class="book-read-status">Read: ${book.readStatus}</div>
  <button class="remove-btn">Remove</button>
  <button class="mark-btn">${toggleText}</button>
  </div>
  `;  

} 


const library = new Library();

library.addBook('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpVv3FC9LXj1sr9EOOt-pmDcC3LaocHLT-XA&s', 'The Murder of History', 'K.K.Aziz', 200, 'Yes');
library.addBook('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRGTbpydDXhx0pgNMlb480AbauiFjPziZdLQ&s', '1984', 'George Orwell', 327, 'No');
library.addBook('https://readings-storage.s3.ap-south-1.amazonaws.com/images/9781591847816.webp', 'Ego is the enemy', 'Ryan Holiday', 180, 'No');
library.addBook('https://m.media-amazon.com/images/I/81kg51XRc1L.jpg', 'Atomic Habits', 'James Clear', 320, 'Yes');
library.addBook('https://www.penguinrandomhouse.co.za/sites/penguinbooks.co.za/files/cover/9780099590088.jpg', 'Sapiens: A Brief history of Humankind', 'Yuval Noah Harari', 443, 'No');
library.addBook('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3sNoBdV-gCmgfq58BE6IlQ_fwkSZjD143FA&s', 'Think and Grow Rich', 'Napoleon Hill', 238, 'No');
library.addBook('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5ImvQ8AfMLWqt5ZZq7hatx_jK0avBr7ZJCw&s', 'The Psychology of Money', 'Morgan Housel', 256, 'No');

library.displayBooks();

function eventDelegation() {

  delegate(bookContainer, '.book-card', 'click', (e, bookEl) => {
    const bookId = bookEl.dataset.id;
    const book = library.getBook(bookId);
    if (!book) return; 

    if (e.target.matches('.remove-btn')) {
      library.removeBook(bookId); 
      bookEl.remove();            
    }

    if (e.target.matches('.mark-btn')) {
      book.toggleRead(); 

      bookEl.dataset.readStatus = book.readStatus;

      bookEl.querySelector('.book-read-status').textContent =
        `Read: ${book.readStatus}`;

      bookEl.querySelector('.mark-btn').textContent =
        book.readStatus === 'Yes' ? 'Mark Unread' : 'Mark Read'; 
    }
  });

}

eventDelegation();


on(addBtn, 'click', () => dialog.showModal())
on(closeBtn, 'click', () => dialog.close())
on(submitBtn, 'click', (e) => {

  e.preventDefault();
  
  const myForm = $('.form');

  if(!myForm.checkValidity()) return;

  const formData = new FormData(myForm);

  const src = formData.get('book-image') || "https://placehold.co/400";

  library.addBook(src, formData.get('book-name'), formData.get('book-author'), formData.get('book-pages'), formData.get('read-status'))
  
  myForm.reset();

  const newBook = library.books[library.books.length - 1];
  bookContainer.insertAdjacentHTML('beforeend', bookTemplate(newBook));

})
