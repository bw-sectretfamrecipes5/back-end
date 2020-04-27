const express = require('express');
const cors = require('cors');

// const usersRouter = require(''); // @TODO: Add route base on app
// const authenticator = require('./authenticator');
const registerRouter = require('../routes/register-router');
const loginRouter = require('../routes/login-router');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/api/register', registerRouter);
server.use('/api/login', loginRouter);
// server.use('/api/users', authenticator, usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
