const db = require('../../data/dbConfig.js');

module.exports = {
  findByUsername: (username) => {
    return db('users').where('username', username);
  }
};