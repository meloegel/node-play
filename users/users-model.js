const db = require('../data/db-config')

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    login
}

function getUsers() {
    return db('users')
}

function getUser(id) {
    return db('users')
        .where({ id })
        .first()
}

function addUser(user) {
    return db('users').insert(user, 'id')
}

function updateUser(changes, id) {
    return db('users')
        .where({ id })
        .update(changes)
}

function deleteUser(id) {
    return db('users')
        .where({ id })
        .del()
}

function login(filter) {
    return db('users')
        .where(filter)
        .orderBy('id')
}