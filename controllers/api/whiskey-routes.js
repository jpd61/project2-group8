const router = require('express').Router();
const { User, Whiskey, Comment, Vote } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// GET /api/users 
router.get('/', (req, res) => {
    Whiskey.findAll({
        attributes: [
            'id',
            'name',
            'type',
            'bottle_size',
            'price_paid',
            'resell_value',
            'resell_url',
            'user_id',
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
            },
          ]
    })
      .then(dbWhiskeyData => res.json(dbWhiskeyData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
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
            'notes',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE whiskey.id = vote.whiskey_id)'), 'vote_count']
          ],
        include: [
            {
                model: User,
                attributes: ['username']
              },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username']
                }
            }
          ]

    })
      .then(dbWhiskeyData => {
        if (!dbWhiskeyData) {
          res.status(404).json({ message: 'No Whiskey found with this id' });
          return;
        }
        res.json(dbWhiskeyData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// POST /api/whiskey
router.post('/', (req, res) => {
    Whiskey.create({
      name: req.body.name,
      type: req.body.type,
      bottle_size: req.body.bottle_size,
      price_paid: req.body.price_paid,
      resell_value: req.body.resell_value,
      resell_url: req.body.resell_url,
      comments: req.body.comments,
      user_id: req.session.user_id,
      notes: req.body.notes
    })
    .then(dbWhiskeyData => res.json(dbWhiskeyData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });

router.put('/upvote', withAuth, (req, res) => {
    // make sure the session exists first
    if (req.session) {
      // pass session id along with all destructured properties on req.body
      Whiskey.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });

// PUT /api/users/1
router.put('/:id', withAuth, (req, res) => {
    Whiskey.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
      }
    })
      .then(dbWhiskeyData => {
        if (!dbWhiskeyData[0]) {
          res.status(404).json({ message: 'No Whiskey found with this id' });
          return;
        }
        res.json(dbWhiskeyData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// DELETE /api/users/1
router.delete('/:id', withAuth, (req, res) => {
    Whiskey.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbWhiskeyData => {
        if (!dbWhiskeyData) {
          res.status(404).json({ message: 'No Whiskey found with this id' });
          return;
        }
        res.json(dbWhiskeyData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;