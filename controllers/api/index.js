const router = require('express').Router();

const userRoutes = require('./user-routes');
const whiskeyRoutes = require('./whiskey-routes');

router.use('/users', userRoutes);

router.use('/whiskey', whiskeyRoutes);

module.exports = router;