import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookForm from '../components/BookForm';
import axios from 'axios';

const AddBook = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const addBook = async (book) => {
    try {
      const response = await axios.post('http://localhost:5000/api/books', book);
      console.log('Book added:', response.data);
      setBooks([...books, response.data]);

      navigate('/view-books'); 
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="center-heading" >Add a New Book</h2>
      <BookForm onSubmit={addBook} />
    </div>
  );
};

export default AddBook;
