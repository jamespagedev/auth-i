
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Precondition - Ensure passwords are no longer than 16 characters
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'James',
          password: '$2a$14$PCThudlabVgN8pdoAGUsFOGDpuz76TTSh4LYPXyi5XNfGwXPbgaGm' // pass123
        },
        {
          username: 'Saywer',
          password: 'Password123' // Password123
        },
        {
          username: 'Luis',
          password: 'Pswd^$haha' // Pswd^$haha
        },
        {
          username: 'RandomUser',
          password: 'I%Am^Random&123' // I%Am^Random&123
        }
      ]);
    });
};
