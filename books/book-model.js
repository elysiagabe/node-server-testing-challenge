const db = require('../data/dbConfig');

module.exports = {
    find,
    findById,
    add,
    remove
}

function find() {
    return db('books')
}

function findById(id) {
    return db('books').where({ id }).first();
}

function add(book) {
    return db('books')
        .insert(book, 'id')
        .then(([id]) => {
            return findById(id)
        })
}

function remove(id) {
    return db('books').where({ id }).del()
}