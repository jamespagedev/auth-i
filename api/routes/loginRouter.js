/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
const express = require('express');
const db = require('../../data/helpers/dbLgnHelpers.js');
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
  // Check username exist AND client password matches hash password in db
  const userCreds = req.body;

  db.findByUsername(userCreds.username)
    .first() // returns the first single object (containing the user found) in the array. If no objects were found, an empty array is returned.
    .then(user => {
      // If user object was obtained AND...
      // the client password matches the db hash password
      console.log(userCreds);
      console.log(user);
      if (user && bcrypt.compareSync(userCreds.password === user.password)) {
        // go over sessions and cookies tomorrow (tuesday - 1/22/2019)
        res.status(200).send('Logged in');
      } else {
        res.status(401).json({ err: "You shall not pass!" })
      }
    })
    .catch(err => res.status(500).send(err));
})

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;