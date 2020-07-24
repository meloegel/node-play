
exports.seed = function (knex, Promise) {
  return knex('question_comments').truncate()
    .then(function () {
      return knex('question_comments').insert([
        { id: 1, user_id: 1, question_id: 1, comment_id: 1 },
        { id: 2, user_id: 2, question_id: 2, comment_id: 2 },
        { id: 3, user_id: 3, question_id: 3, comment_id: 3 }
      ]);
    });
};
