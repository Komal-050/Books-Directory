import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

const BookList = ({ books, onDelete, onEdit  }) => {
  return (
    <div>
      <h2>Book List</h2>
      <ul className="list-group">
        {books.map((book) => (
          <li key={book.id} className="list-group-item">
            {book.title} BY {book.author}
            <div className="icon-container">
            <span 
                onClick={() => onEdit(book)} 
                className="edit-icon" 
              >
                <FontAwesomeIcon icon={faEdit} />
              </span>
            <span 
              onClick={() => onDelete(book.id)} 
              className="delete-icon" 
            >
              <FontAwesomeIcon icon={faTrash} />
            </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
