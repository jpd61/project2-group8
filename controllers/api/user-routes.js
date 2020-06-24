const router = require('express').Router();
const { User, Whiskey } = require('../../models');
// (Is there a lodash helper to replace withAuth?)
const withAuth = require('../../utils/auth');

// GET /api/users 
router.get('/', (req, res) => {
    // Access our User model and run .findAll() method
    User.findAll({
        attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;