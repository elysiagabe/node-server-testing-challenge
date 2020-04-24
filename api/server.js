const express = require('express');

const Books = require('../books/book-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up & running' })
});

server.get('/books', (req, res) => {
    Books.find()
        .then(books => {
            res.status(200).json(books)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: err.message })
        })
})

server.post('/books', (req, res) => {
    const newBook = req.body;

    Books.add(newBook)
        .then(ids => {
            res.status(201).json({ message: 'Book successfully added'})
        })
        .catch(err => {
            res.status(500).json({ errorMessage: err.message })
        })
})

server.delete('/books/:id', (req, res) => {
    const { id } = req.params;

    Books.remove(id)
        .then(count => {
            if (count > 0) {
                res.json({ message: 'Book successfully deleted' })
            } else {
                res.status(404).json({ message: 'Book not found' })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: err.message })
        })
})

module.exports = server;