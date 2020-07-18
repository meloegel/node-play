
exports.seed = function (knex, Promise) {
  return knex('comments').truncate()
    .then(function () {
      return knex('comments').insert([
        { id: 1, question_id: 1, user_id: 1, comment: 'Because its my favorite color' },
        { id: 2, question_id: 1, user_id: 2, comment: 'I dont know' },
        { id: 3, question_id: 2, user_id: 1, comment: '42' },
        { id: 5, question_id: 2, user_id: 2, comment: 'I dont know' },
        { id: 6, question_id: 3, user_id: 1, comment: 'No one knows' }
      ]);
    });
};
