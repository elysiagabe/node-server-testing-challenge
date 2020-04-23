const express = require('express');

//IMPORT MODEL HERE

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up & running' })
});

module.exports = server;