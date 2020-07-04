const router = require('express').Router();
const sequelize = require('../config/connection');
const { Whiskey, User, Vote, Comment } = require('../models');

// Get all Whiskeys render homepage
router.get('/', (req, res) => {
    Whiskey.findAll({
      attributes: [
        'id',
        'name',
        'bottle_size',
        'price_paid',
        'resell_value',
        'notes',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE whiskey.id = vote.whiskey_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'whiskey_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbWhiskeyData => {
        const whiskeys = dbWhiskeyData.map(whiskey => whiskey.get({ plain: true }));
        res.render('homepage', {
            whiskeys,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

// Signup
  // router.get('/signup', (req, res) => {
  //   if (req.session.loggedIn) {
  //     res.redirect('/');
  //     return;
  //   }
  //   res.render('signup');
  // });

// Get all Whiskeys for /whiskey extension 
  // router.get('/whiskey', (req, res) => {
  //   Whiskey.findAll({
  //       attributes: [
  //           'id',
  //           'name',
  //           'bottle_size',
  //           'price_paid',
  //           'resell_value',
  //           'user_id',
  //           'notes',
  //           [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE whiskey.id = vote.whiskey_id)'), 'vote_count']
  //       ],
  //       include: [
  //         {
  //           model: Comment,
  //           attributes: ['id', 'comment_text', 'whiskey_id', 'user_id', 'created_at'],
  //           include: {
  //             model: User,
  //             attributes: ['username']
  //           }
  //         },
  //         {
  //           model: User,
  //           attributes: ['username']
  //         }
  //       ]
  //     })
  //       .then(dbWhiskeyData => {
  //         const whiskeys = dbWhiskeyData.map(whiskey => whiskey.get({ plain: true }));
  //         res.render('whiskey', {
  //             whiskeys,
  //             loggedIn: req.session.loggedIn
  //           });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         res.status(500).json(err);
  //       });
  // });

// Get all Whiskeys for /browse (for future development)
  // router.get('/browse', (req, res) => {
  //   Whiskey.findAll({
  //       attributes: [
  //         'id',
  //         'name',
  //         'bottle_size',
  //         'price_paid',
  //         'resell_value',
  //         'user_id',
  //         'notes',
  //         [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE whiskey.id = vote.whiskey_id)'), 'vote_count']
  //       ],
  //       include: [
  //         {
  //           model: Comment,
  //           attributes: ['id', 'comment_text', 'whiskey_id', 'user_id', 'created_at'],
  //           include: {
  //             model: User,
  //             attributes: ['username']
  //           }
  //         },
  //         {
  //           model: User,
  //           attributes: ['username']
  //         }
  //       ]
  //     })
  //       .then(dbWhiskeyData => {
  //         const whiskeys = dbWhiskeyData.map(whiskey => whiskey.get({ plain: true }));
  //         res.render('browse', {
  //             whiskeys,
  //             loggedIn: req.session.loggedIn
  //           });
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         res.status(500).json(err);
  //       });
  // });


// Get whiskey by ID
router.get('/whiskey/:id', (req, res) => {
    Whiskey.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'name',
        'bottle_size',
        'price_paid',
        'resell_value',
        'notes',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE whiskey.id = vote.whiskey_id)'), 'vote_count']
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'whiskey_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbWhiskeyData => {
        if (!dbWhiskeyData) {
          res.status(404).json({ message: 'No whiskey found with this id' });
          return;
        }

        const whiskey = dbWhiskeyData.get({ plain: true });

        res.render('single-whiskey', {
            whiskey,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;