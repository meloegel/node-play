const express = require('express')

const router = express.Router()

const Users = require('./users-model')

router.get('/', (req, res) => {
    Users.getUsers()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Error getting all users' })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Users.getUser(id)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ errorMessage: 'Could not find user with that Id' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Error getting user' })
        })
})

router.post('/', (req, res) => {
    const newUser = req.body
    Users.addUser(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Error adding user' })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    Users.getUser(id)
        .then(user => {
            if (user) {
                Users.updateUser(changes, id)
                    .then(updatedUser => {
                        res.status(200).json(updatedUser)
                    })
            } else {
                res.status(404).json({ errorMessage: 'Could not find User with that id' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Failed to update User' })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Users.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json({ removed: deleted })
            } else {
                res.status(404).json({ errorMessage: 'Could not find User with that id' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Error deleting user' })
        })
})

module.exports = router;