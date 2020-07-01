const router = require('express').Router();
const sequelize = require('../config/connection');
const { Whiskey, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
    Whiskey.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
      },
      attributes: [
            'id',
            'name',
            'type',
            'bottle_size',
            'price_paid',
            'resell_value',
            'resell_url',
            'user_id',
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
        // serialize data before passing to template
        const whiskeys = dbWhiskeyData.map(whiskey => whiskey.get({ plain: true }));
        res.render('dashboard', { whiskeys, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/edit/:id', withAuth, (req, res) => {
    Whiskey.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'name',
        'type',
        'bottle_size',
        'price_paid',
        'resell_value',
        'resell_url',
        'user_id',
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
  
        // serialize the data
        const whiskey = dbWhiskeyData.get({ plain: true });

        res.render('edit-whiskey', {
            whiskey,
            loggedIn: true
            });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;