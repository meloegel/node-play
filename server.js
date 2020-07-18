const express = require('express')

const server = express();

const UserRouter = require('./users/users-router')
const QuestionsRouter = require('./questions/questions-router')
const CommentsRouter = require('./comments/comments-router')

server.use(express.json())

server.use('/api/users', UserRouter)
server.use('/api/questions', QuestionsRouter)
server.use('/api/comments', CommentsRouter)

server.get('/', (req, res) => {
    const message = process.env.MESSAGE
    res.status(200).json({ message })
});

module.exports = server;