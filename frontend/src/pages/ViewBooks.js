import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from '../components/BookList';
import SideMenu from '../components/SideMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './ViewBooks.css';

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookToBeUpdated, setBookToBeUpdated] = useState(null); 
  const [editedBookData, setEditedBookData] = useState({ title: '', author: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`);
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = (book) => {
    console.log(`Handle edit book`, book)
    setBookToBeUpdated(book);
    setEditedBookData({ title: book.title, author: book.author });
    setErrorMessage('');
  };

  const handleSaveEdit = async () => {

    if (!editedBookData.title || !editedBookData.author) {
      setErrorMessage('Title and Author are required.');
      return;
    }

    try {
      console.log('Updating book with ID:', bookToBeUpdated);

      const response = await axios.put(`http://localhost:5000/api/books/${bookToBeUpdated.id}`, editedBookData);
      setBooks(books.map((book) => (book.id === bookToBeUpdated.id ? response.data : book)));
      setBookToBeUpdated(null);
      setEditedBookData({ title: '', author: '' });
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBookData({ ...editedBookData, [name]: value });
  };

  return (
    <div className="view-books-container">
      <div className="side-menu-container">
        <SideMenu books={books} />
      </div>
      <div className="book-list-container">
        <div className="search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="Search for books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          </div>
          <BookList books={filteredBooks} onDelete={handleDelete} onEdit={handleEdit} />

          {bookToBeUpdated && (
          <div className="edit-modal">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={editedBookData.title}
              onChange={handleEditInputChange}
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={editedBookData.author}
              onChange={handleEditInputChange}
            />
           {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="edit-icons">
              <span onClick={handleSaveEdit} className="save-icon">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span onClick={() => setBookToBeUpdated(null)} className="cancel-icon">
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>
          </div>
        )}

        </div>
      </div>
    );
};

export default ViewBooks;
