const Book = require('../models/bookModel');

exports.getAllBooks = (req, res) => {
    Book.getAll((err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).send(err);
        }
        res.json(results);
    });
};

exports.getBookById = (req, res) => {
    const id = req.params.id;
    Book.getById(id, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
};

exports.createBook = (req, res) => {
    const book = req.body;
    console.log('Incoming book data:', book); 
    if (!book.title || !book.author || !book.genre) {
        return res.status(400).json({ message: 'Title, author, and genre are required' });
    }
    Book.create(book, (err, result) => {
        if (err) {
            console.error('Error inserting book into the database:', err); 
            return res.status(500).send(err);
        }
        res.status(201).json({ id: result.insertId, ...book });
    });
};

exports.updateBook = (req, res) => {
    const id = req.params.id;
    const book = req.body;

    Book.update(id, book, (err, updatedBook) => {
        console.log("whats happening here.....", updatedBook);
        if (err) return res.status(500).send(err);
        // console.log("errrorrrrrrrrrr", result);
        res.status(201).json(updatedBook[0]);
    });
};

exports.deleteBook = (req, res) => {
    const id = req.params.id;
    Book.delete(id, (err) => {
        if (err) return res.status(500).send(err);
        res.status(204).send();
    });
};
