const bcrypt = require('bcryptjs');
const db = require('../helpers/dbRegHelpers.js');

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
          password: bcrypt.hashSync('pass123', db.settings.pwdHashLength)
        },
        {
          username: 'Saywer',
          password: bcrypt.hashSync('Password123', db.settings.pwdHashLength)
        },
        {
          username: 'Luis',
          password: bcrypt.hashSync('Pswd^$haha', db.settings.pwdHashLength)
        },
        {
          username: 'RandomUser',
          password: bcrypt.hashSync('I%Am^Random&123', db.settings.pwdHashLength)
        }
      ]);
    });
};
