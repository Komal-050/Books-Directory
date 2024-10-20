import React from 'react';

const SideMenu = ({ books }) => {
  const authors = [...new Set(books.map((book) => book.author))];
  const genres = [...new Set(books.map((book) => book.genre))];

  return (
    <div className="side-menu">
      <h3>Authors</h3>
      <ul className="list-group mb-3">
        {authors.map((author, index) => (
          <li key={index} className="list-group-item">
            {author}
          </li>
        ))}
      </ul>

      <h3>Genres</h3>
      <ul className="list-group">
        {genres.map((genre, index) => (
          <li key={index} className="list-group-item">
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
