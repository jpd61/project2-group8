const router = require('express').Router();
const sequelize = require('../config/connection');
const { Whiskey, User, Vote, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Get all Whiskeys for /inventory
router.get('/', withAuth, (req, res) => {
    console.log(req.session);
    Whiskey.findAll({
        where: {
          user_id: req.session.user_id
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
          const whiskeys = dbWhiskeyData.map(whiskey => whiskey.get({ plain: true }));
          res.render('inventory', {whiskeys, loggedIn: true});
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
  });

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