//imports
const express = require('express');
const server = express();
const projectsRouter = require('./projects/projectsRouter');
const actionsRouter = require('./actions/actionsRouter');
const cors = require('cors');
const logger = require('./middleware/logger');


//global use
server.use(logger('logger'));
server.use(express.json());
server.use(cors());

//routes
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: "WebAPI Challenge" });
});

module.exports = server;