/***************************************************************************************************
 ******************************************* dependencies ******************************************
 **************************************************************************************************/
const express = require('express');
const router = express.Router();

/***************************************************************************************************
 ******************************************** middleware *******************************************
 **************************************************************************************************/
// None

/***************************************************************************************************
 ********************************************** routes *********************************************
 **************************************************************************************************/
router.get('/', (req, res) => {
  if (req.session.userId) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).send('you can never leave');
      } else {
        res.status(200).send('bye bye')
      }
    })
  } else {
    res.json({ message: 'logged out already' })
  }
})

/***************************************************************************************************
 ********************************************* export(s) *******************************************
 **************************************************************************************************/
module.exports = router;