const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get comments
router.get('/', (req, res) => {
    Comment.findAll({})
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Post new comments
router.post('/', withAuth, (req, res) => {
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      whiskey_id: req.body.whiskey_id,
      user_id: req.session.user_id,
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// Delete comments
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCommentData => {
          if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(dbCommentData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;