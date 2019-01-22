const db = require('../../data/dbConfig.js');

module.exports = {
  getAllUsers: () => {
    return db('users');
  }
};