const express = require('express')

const router = express.Router()

const Comments = require('./comments-model')

router.get('/', (req, res) => {
    Comments.getComments()
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Error getting all the comments' })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Comments.getComment(id)
        .then(comment => {
            if (comment) {
                res.status(200).json(comment)
            } else {
                res.status(404).json({ errorMessage: 'Could not find comment with that Id' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Error getting comment' })
        })
})

router.post('/', (req, res) => {
    const newComment = req.body
    Comments.addComment(newComment)
        .then(comment => {
            res.status(201).json({ Posted: newComment })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Error adding comment' })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    Comments.getComment(id)
        .then(comment => {
            if (comment) {
                Comments.updateComment(changes, id)
                    .then(updatedComment => {
                        res.status(200).json({ Updated: `Comment with id: ${id}` })
                    })
            } else {
                res.status(404).json({ errorMessage: 'Could not find Comment with that id' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Failed to update Comment' })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Comments.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json({ Removed: `Comment with id: ${id}` })
            } else {
                res.status(404).json({ errorMessage: 'Could not find Comment with that id' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Error deleting comment' })
        })
})

module.exports = router;