const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const restrictedMiddleware = require('./auth/restricted-middleware')

const server = express();

const AuthRouter = require('./auth/auth-router')
const UserRouter = require('./users/users-router')
const QuestionsRouter = require('./questions/questions-router')
const CommentsRouter = require('./comments/comments-router')

// Add headers
server.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
server.use(helmet())
server.use(express.json())
server.use(cors())

server.listen(3000, function () {
    console.log('CORS-enabled web server listening on port 3000')
})

server.use('/auth', AuthRouter)
server.use('/api/users', restrictedMiddleware, UserRouter)
server.use('/api/questions', restrictedMiddleware, QuestionsRouter)
server.use('/api/comments', restrictedMiddleware, CommentsRouter)

server.get('/', (req, res) => {
    const message = process.env.MESSAGE
    res.status(200).json({ message })
});

module.exports = server;

