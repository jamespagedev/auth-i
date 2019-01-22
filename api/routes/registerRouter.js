/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
const express = require('express');
const db = require('../../data/helpers/dbRegHelpers.js');
const bcrypt = require('bcryptjs');
const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
// None

/***************************************************************************************************
 ********************************************** routes *********************************************
 **************************************************************************************************/
router.post('/', (req, res) => {
  // Precondition - Username must be unique (not used in database)
  const newUserCreds = req.body;
  const hashLengthComplexity = 14; // 14 is a good baseline for time complexity when comparing password/hash for login

  // Creates a hash password to store in the database...
  newUserCreds.password = bcrypt.hashSync(newUserCreds.password, hashLengthComplexity);

  // Adds a single user to the database
  db.addUser(newUserCreds)
    .then(Ids => {
      res.status(201).json({ id: Ids[0] }); // returns the userId created by the database
    })
    .catch(err => res.status(500).send(err));
})
/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;