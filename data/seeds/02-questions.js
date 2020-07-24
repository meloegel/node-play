
exports.seed = function (knex, Promise) {
  return knex('questions').truncate()
    .then(function () {
      return knex('questions').insert([
        { id: 1, question: 'Why is the sky blue?' },
        { id: 2, question: 'What is the meaning of life?' },
        { id: 3, question: 'Why is pitbull popular?' }
      ]);
    });
};
