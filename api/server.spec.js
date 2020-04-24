const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig');

describe('server', function() {
    describe('GET / endpoint', function() {
        it('should return 200 OK', function() {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should return a JSON object', function() {
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.type).toEqual('application/json');
                })
        })

        it('should should have "api" key and "up & running" value in body of response', function () {
            const expectedBody = { api: 'up & running' }
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.body).toEqual(expectedBody);
                })
        })
    })

    describe('POST /books endpoint', function() {
        beforeEach(async () => {
            await db('books').truncate()
        })

        it('should return 201 status on success', function() {
            return request(server)
                .post('/books')
                .send({ author: 'Jhumpa Lahiri', title: 'The Namesake' })
                .then(res => {
                    expect(res.status).toBe(201);
                })
        })

        it('should return a JSON object', function() {
            return request(server)
                .post('/books')
                .send({ author: 'Jhumpa Lahiri', title: 'The Namesake' })
                .then(res => {
                    expect(res.type).toEqual('application/json');
                })
        })

        it('should return success message of "Book successfully added"', function() {
            return request(server)
                .post('/books')
                .send({ author: 'Jhumpa Lahiri', title: 'The Namesake' })
                .then(res => {
                    expect(res.body.message).toBe("Book successfully added");
                })
        })

        it('should add book to db', async function() {
            const title = 'The Namesake';
            const existing = await db('books').where({ title });
            expect(existing).toHaveLength(0);

            await request(server)
                .post('/books')
                .send({ author: 'Jhumpa Lahiri', title: 'The Namesake' })
                .then(res => {
                    expect(res.status).toBe(201);
                })

            const added = await db('books');
            expect(added).toHaveLength(1);
        })
    })

    describe('DELETE /books/:id endpoint', function() {
        const book = {
            title: 'Normal People',
            author: 'Sally Rooney',
            id: 2
        }

        const book2 = {
            title: 'test',
            author: 'test',
            id: 5
        }

        it('if book is found, should return status code of 200', async function() {
            await db('books').insert(book);

            return request(server)
                .delete('/books/2')
                .then(res => {
                    expect(res.status).toBe(200)
                })
        })

        it('should return success message', async function() {
            await db('books').insert(book);

            return request(server)
                .delete('/books/2')
                .then(res => {
                    expect(res.body.message).toBe('Book successfully deleted')
                })
        })

        it('should remove book from db', async function() {
            await db('books').insert(book2);

            const id = 2;
            const deleted = await db('books').where({ id })
            expect(deleted).toEqual([]);
        })

        it('if book w/id is NOT found, should return 404 status', function() {
            return request(server)
                .delete('/books/10')
                .then(res => {
                    expect(res.body.message).toBe('Book not found')
                })
        })
    })
})