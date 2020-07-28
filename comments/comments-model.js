const db = require('../data/db-config')

module.exports = {
    getComments,
    getComment,
    addComment,
    updateComment,
    deleteComment
}

function getComments() {
    return db('comments')
}

function getComment(id) {
    return db('comments')
        .where({ id })
        .first()
}

function addComment(comment) {
    return db('comments').insert(comment, 'id')
}

function updateComment(changes, id) {
    return db('comments')
        .where({ id })
        .update(changes)
}

function deleteComment(id) {
    return db('comments')
        .where({ id })
        .del()
}
