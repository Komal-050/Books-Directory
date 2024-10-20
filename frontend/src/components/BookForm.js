import React, { useState } from 'react';

const BookForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, genre });
    setTitle('');
    setAuthor('');
    setGenre('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Author</label>
        <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Genre</label>
        <input type="text" className="form-control" value={genre} onChange={(e) => setGenre(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary">Add Book</button>
    </form>
  );
};

export default BookForm;
