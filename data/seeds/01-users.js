
exports.seed = function (knex, Promise) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        { id: 1, name: 'Mark', email: 'email@email.com' },
        { id: 2, name: 'Steve', email: 'testemail@email.com' },
        { id: 3, name: 'Bob', email: 'emailtest@email.com' }
      ]);
    });
};
