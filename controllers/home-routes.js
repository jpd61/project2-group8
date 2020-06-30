const router = require('express').Router();
const sequelize = require('../config/connection');
const { Whiskey, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    
    Whiskey.findAll({
      attributes: [
        'id',
        'name',
        'type',
        'bottle_size',
        'price_paid',
        'resell_value',
        'resell_url'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'whiskey_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username', 'twitter']
          }
        },
        {
          model: User,
          attributes: ['username', 'twitter']
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

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('signup');
  });

  router.get('/whiskey', (req, res) => {
    res.render('whiskey');
  });

  router.get('/browse', (req, res) => {
    res.render('browse');
  });

  router.get('/whiskey/:id', (req, res) => {
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
        'resell_url'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'whiskey_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username', 'twitter']
          }
        },
        {
          model: User,
          attributes: ['username', 'twitter']
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
  
        // pass data to template
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