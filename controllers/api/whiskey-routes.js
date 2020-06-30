const router = require('express').Router();
const { User, Whiskey, Comment } = require('../../models');
// (Is there a lodash helper to replace withAuth?)
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
            'resell_url'
          ],
        include: [
            {
                model: User,
                attributes: ['username', 'twitter']
              },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                  model: User,
                  attributes: ['username', 'twitter']
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
      type: req.body.type
    })
    .then(dbWhiskeyData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.loggedIn = true;
    
        res.json(dbWhiskeyData);
      });
    });
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