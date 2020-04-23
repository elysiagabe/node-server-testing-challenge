const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig');

describe('server', function() {
    describe('GET /', function() {
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

        it('should body of response should have "api" key and "up & running" value', function () {
            const expectedBody = { api: 'up & running' }
            return request(server)
                .get('/')
                .then(res => {
                    expect(res.body).toEqual(expectedBody);
                })
        })
    })
})