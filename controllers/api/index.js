const router = require('express').Router();

const userRoutes = require('./user-routes');
const whiskeyRoutes = require('./whiskey-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/whiskey', whiskeyRoutes);

module.exports = router;