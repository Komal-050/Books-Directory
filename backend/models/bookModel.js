const db = require('../config/db');

const Book = {
    getAll: (callback) => {
        if (typeof callback !== 'function') {
            return callback(new Error('Callback is not a function'), null);
        }
        return db.query('SELECT * FROM books', (err, result) => {
            if(err) return callback(err);
            callback(null, result);
        });
    },

    getById: (id, callback) => {
  
        if (!id || isNaN(id)) {
            return callback(new Error('Invalid book ID'), null);
        }
    
        if (typeof callback !== 'function') {
            return callback(new Error('Callback is not a function'), null);
        }
        return db.query('SELECT * FROM books WHERE id = ?', [id], callback);
    },

    create: (book, callback) => {
 
        if (!book || !book.title || !book.author || !book.genre) {
            return callback(new Error('Missing book details (title, author, genre)'), null);
        }
        if (typeof callback !== 'function') {
            return callback(new Error('Callback is not a function'), null);
        }
        return db.query(
            'INSERT INTO books (title, author, genre) VALUES (?, ?, ?)',
            [book.title, book.author, book.genre],
            callback
        );
    },

    update: (id, book, callback) => {
        if (!id || isNaN(id)) {
            return callback(new Error('Invalid book ID'), null);
        }

        if (!book || !book.title || !book.author ) {
            return callback(new Error('Missing book details (title, author)'), null);
        }

        if (typeof callback !== 'function') {
            return callback(new Error('Callback is not a function'), null);
        }

        return db.query(
            'UPDATE books SET title = ?, author = ? WHERE id = ?',
            [book.title, book.author, id],  (err, result) => {
                if(err) return callback(err);


                 Book.getById(id, (err, updatedBook) => {
                    console.log("uppddaatteedd bbookk", updatedBook);
                    
                        if (err) return callback(err);
                callback(null, updatedBook);
            });
        }
        )
    },
        

    delete: (id, callback) => {
        if (!id || isNaN(id)) {
            return callback(new Error('Invalid book ID'), null);
        }
        
        if (typeof callback !== 'function') {
            return callback(new Error('Callback is not a function'), null);
        }
        return db.query('DELETE FROM books WHERE id = ?', [id], (err, result) => {
            if(err) return callback(err);
            callback(null, result);
        })
    }
};

module.exports = Book;
