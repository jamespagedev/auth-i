const db = require('../../data/dbConfig.js');

module.exports = {
  addUser: (user) => {
    return db('users').insert(user);
  }
};