const post = document.querySelector('#post');
const counter = document.querySelector('#current');
const main = document.querySelector('body');
const purple = document.querySelector('#purple-theme');
const green = document.querySelector('#green-theme');
const yellow = document.querySelector('#yellow-theme');
const posts = document.querySelector('#post');
const notesForm = document.querySelector('#editor-form');
let store = JSON.parse(localStorage.getItem('db')) || [];

// Display total text count
const countText = () => {
  let totalText = post.value.length;
  return (current.textContent = totalText);
};
post.addEventListener('keyup', countText);

// Switch theme
green.addEventListener('click', () => {
  if (localStorage.getItem('theme') != 'green') {
    localStorage.setItem('theme', 'green');
    main.className = localStorage.getItem('theme');
  }
});
yellow.addEventListener('click', () => {
  if (localStorage.getItem('theme') !== 'yellow') {
    localStorage.setItem('theme', 'yellow');
    main.className = localStorage.getItem('theme');
  }
});
purple.addEventListener('click', () => {
  if (localStorage.getItem('theme') !== 'purple') {
    localStorage.setItem('theme', 'purple');
    main.className = localStorage.getItem('theme');
  }
});

// Template Builder
const showNotes = ({ id, post, date }) => {
  const noteSection = document.createElement('div');
  noteSection.classList.add('notes-container');
  const notes = document.createElement('article');
  notes.classList.add('single-note');
  notes.textContent = post.substring(0, 100);

  const viewMore = document.createElement('a');
  viewMore.classList.add('view-more');
  viewMore.textContent = '...';
  viewMore.setAttribute('title', 'View more');
  viewMore.addEventListener('click', e => {
    e.preventDefault();
    if (notes.textContent.length >= 110) {
      notes.textContent = post;
      viewMore.setAttribute('title', 'View less');
      notes.appendChild(noteActions);
    }
  });

  const noteActions = document.createElement('span');
  noteActions.classList.add('note-actions');

  const deleteLink = document.createElement('a');
  deleteLink.textContent = 'Delete';
  deleteLink.setAttribute('data-id', `${id}`);
  deleteLink.addEventListener('click', deleteNote);

  const editLink = document.createElement('a');
  editLink.textContent = 'Edit';
  editLink.setAttribute('data-id', `${id}`);
  editLink.addEventListener('click', editNote);

  const notesDate = document.createElement('aside');
  notesDate.classList.add('note-date');
  notesDate.textContent = date;
  noteActions.appendChild(editLink);
  noteActions.appendChild(deleteLink);
  notes.appendChild(viewMore);
  notes.appendChild(noteActions);
  noteSection.appendChild(notesDate);
  noteSection.appendChild(notes);
  document.querySelector('.notes').appendChild(noteSection);
};
// Get data stored in localStorage
const displayStorage = () => {
  store.reverse().map(item => {
    //console.log(item);
    showNotes(item);
  });
};

// Save notes
// Generate random string to be used as id
const generateId = () => (Math.random() + 1).toString(36).substring(7);
const dateFormat = () => {
  const date = new Date();
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};
notesForm.addEventListener('submit', e => {
  e.preventDefault();
  const obj = { id: generateId(), post: post.value, date: dateFormat() };
  store.push(obj);
  localStorage.setItem('db', JSON.stringify(store));
  location.reload();
  displayStorage();
});

// Delete Notes
const deleteNote = e => {
  e.preventDefault();
  let updatedStore;
  const id = e.target.getAttribute('data-id');
  const check = confirm('Are you sure you want to delete this note');
  if (check) {
    updatedStore = store.filter(item => item.id !== id);
    localStorage.setItem('db', JSON.stringify(updatedStore));
    location.reload();
    displayStorage();
  }
};
// Edit notes
const editNote = e => {
  e.preventDefault();
  const id = e.target.getAttribute('data-id');
  const updatedStore = store.filter(item => item.id === id);
  store = store.filter(item => item.id !== id);
  localStorage.setItem('db', JSON.stringify(store));
  console.log(store);
  const editedStore = updatedStore[0];
  post.value = editedStore.post;
  document.querySelector('#btnSave').value = 'Update';
};

const load = () => {
  main.className = localStorage.getItem('theme');
  displayStorage();
};
document.querySelector('body').addEventListener('load', load());
