const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const restrictedMiddleware = require('./auth/restricted-middleware')

const server = express();

const AuthRouter = require('./auth/auth-router')
const UserRouter = require('./users/users-router')
const QuestionsRouter = require('./questions/questions-router')
const CommentsRouter = require('./comments/comments-router')

server.use(helmet())
server.use(cors())
server.use(express.json())


server.use('/api/auth', AuthRouter)
server.use('/api/auth/users', restrictedMiddleware, UserRouter)
server.use('/api/auth/questions', restrictedMiddleware, QuestionsRouter)
server.use('/api/auth/comments', restrictedMiddleware, CommentsRouter)

server.get('/', (req, res) => {
    const message = process.env.MESSAGE
    res.status(200).json({ message })
});

module.exports = server;

