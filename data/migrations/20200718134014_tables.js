
exports.up = function (knex) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments('id')
            tbl.string('name').notNullable()
            tbl.string('email')
        })
        .createTable('questions', tbl => {
            tbl.increments('id')
            tbl.string('question').notNullable()
        })
        .createTable('comments', tbl => {
            tbl.increments()
            tbl.string('comment').notNullable()
            tbl.integer('user_id').unsigned().references('users.id').onUpdate('CASCADE').onDelete('CASCADE')
            tbl.integer('question_id').notNullable().unsigned().references('questions.id').onUpdate('CASCADE').onDelete('CASCADE')
        })
        .createTable('question_comments', tbl => {
            tbl.increments()
            tbl.integer('user_id').unsigned().references('users.id').onUpdate('CASCADE').onDelete('CASCADE')
            tbl.integer('question_id').unsigned().references('questions.id').onUpdate('CASCADE').onDelete('CASCADE')
            tbl.integer('comment_id').unsigned().references('comments.id').onUpdate('CASCADE').onDelete('CASCADE')
        })
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('questions')
        .dropTableIfExists('comments')
        .dropTableIfExists('question_comments')
};
