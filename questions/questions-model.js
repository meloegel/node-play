const db = require('../app/db-config')

module.exports = {
    getQuestions,
    getQuestion,
    getQuestionComments,
    addQuestion,
    updateQuestion,
    deleteQuestion
}

function getQuestions() {
    return db('questions')
}

function getQuestion(id) {
    return db('questions')
        .where({ id })
        .first()
}

function getQuestionComments(questionId) {
    return db('comments')
        .join('questions', 'questions.id', 'question_id')
        .where('question_id', questionId)
}

function addQuestion(question) {
    return db('questions').insert(question, 'id')
}

function updateQuestion(changes, id) {
    return db('questions')
        .where({ id })
        .update(changes)
}

function deleteQuestion(id) {
    return db('questions')
        .where({ id })
        .del(id)
}