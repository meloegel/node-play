const express = require('express')

const router = express.Router()

const Questions = require('./questions-model')

router.get('/', (req, res) => {
    Questions.getQuestions()
        .then(questions => {
            res.status(200).json(questions)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Error getting all the questions' })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Questions.getQuestion(id)
        .then(question => {
            if (question) {
                res.status(200).json(question)
            } else {
                res.status(404).json({ errorMessage: 'Could not find question with that Id' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Error getting question' })
        })
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    Questions.getQuestionComments(id)
        .then(comments => {
            if (comments) {
                res.status(200).json(comments)
            } else {
                res.status(404).json({ errorMessage: 'Could not find comments for that question' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Error getting comments for that Question' })
        })
})

router.post('/', (req, res) => {
    const newQuestion = req.body
    Questions.addQuestion(newQuestion)
        .then(question => {
            res.status(201).json({ Posted: newQuestion })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Error adding question' })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    Questions.getQuestion(id)
        .then(question => {
            if (question) {
                Questions.updateQuestion(changes, id)
                    .then(updatedQuestion => {
                        res.status(200).json({ Updated: `Question with id: ${id}` })
                    })
            } else {
                res.status(404).json({ errorMessage: 'Could not find Question with that id' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Failed to update Question' })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Questions.deleteQuestion(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json({ removed: deleted })
            } else {
                res.status(404).json({ errorMessage: 'Could not find Question with that id' })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ errorMessage: 'Error deleting question' })
        })
})

module.exports = router;