const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const router = require('express').Router()

const Users = require('../users/users-model')

router.post('/register', validateNewUser, (req, res) => {
    let user = req.body
    const hash = bcryptjs.hashSync(user.password, 10)
    user.password = hash
    Users.addUser(user)
        .then(saved => {
            const token = makeToken(saved)
            res.status(201).json({ data: user, token: token })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Error registering user' })
        })
})

router.post('/login', validateLogin, (req, res) => {
    let { username, password } = req.body
    Users.login({ username })
        .first()
        .then(user => {
            if (user && bcryptjs.compareSync(password, user.password)) {
                const token = makeToken(user)
                res.status(200).json({ message: 'Welcome', jwt_token: token })
            } else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: 'Error logging in user' })
        })
})

function makeToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    }
    const secret = process.env.JWR_SECRET || 'oakjsbfduiwefuidhaifdabfdjhuyasfu'
    const options = {
        expiresIn: '10d'
    }
    return jwt.sign(payload, secret, options)
}

function validateNewUser(req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ message: 'Please fill in all required fields' })
    } else {
        next()
    }
}

function validateLogin(req, res, next) {
    if (!req.body.length === 0) {
        res.status(400).json({ message: 'No Credentials Provided' })
    } else if (!req.body.username || !req.body.password) {
        res.status(400).json({ message: 'Please fill in all required fields' })
    } else {
        next()
    }
}

module.exports = router